import { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { useFormik, FormikProvider, FieldArray, getIn } from 'formik';
import { useDropzone } from 'react-dropzone';
import * as Yup from 'yup';
import { ImageIcon, XIcon } from 'lucide-react';
import Switch from 'react-switch';
import { useRouter } from 'next/navigation';

// Import necessary constants from config.ts
import {
  AUTHOR,
  SOCIAL_URLS,
  DEFAULT_KEYWORDS,
  USE_LOGO_IN_NAVBAR,
  USE_ARCHIVE,
  ARCHIVE_ITEMS_TO_SHOW,
  CTA_SOCIAL_PLATFORM,
  PRODUCTION_URL,
  VERCEL_ANALYTICS,
  USE_LOGO_FOR_HEADSHOT,
  GA_MEASUREMENT_ID,
} from '@/config';

// Import SocialPlatform type
import { SocialPlatform } from '@/__samwise/types/SocialPlatform';

// Remove TooltipWrapper import if not used
// import TooltipWrapper from '@/components/tooltip';

type SocialLink = {
  type: string;
  url: string;
};

type FormData = {
  fullName: string;
  vercelUrl: string;
  bio: string;
  description: string;
  logo: File | null;
  logoData?: string | null;
  socialLinks: SocialLink[];
  email?: string;
  keywords: string[];
  googleAnalyticsId?: string;
  vercelAnalyticsEnabled: boolean;
  useLogoInNavbar: boolean;
  ctaSocialPlatform: string;
  headshot: File | null;
  headshotData?: string | null;
  useLogoForHeadshot: boolean;
  useArchive: boolean;
  archiveItemsToShow: number;
};

// Transform SOCIAL_URLS into an array of { type, url }
const socialLinks = Object.entries(SOCIAL_URLS)
  .filter(([type, url]) => url && type !== 'email')
  .map(([type, url]) => ({ type, url }));

const defaultInitialValues: FormData = {
  fullName: AUTHOR.name || '',
  vercelUrl: PRODUCTION_URL || '',
  bio: AUTHOR.bio || '',
  description: AUTHOR.description || '',
  logo: null,
  logoData: AUTHOR.publisherLogo || null,
  socialLinks: socialLinks,
  email: SOCIAL_URLS.email || '',
  keywords: DEFAULT_KEYWORDS || [],
  googleAnalyticsId: GA_MEASUREMENT_ID || '',
  vercelAnalyticsEnabled: VERCEL_ANALYTICS,
  useLogoInNavbar: USE_LOGO_IN_NAVBAR || false,
  ctaSocialPlatform: CTA_SOCIAL_PLATFORM || '',
  headshot: null,
  headshotData: AUTHOR.headshot || null,
  useLogoForHeadshot: USE_LOGO_FOR_HEADSHOT,
  useArchive: USE_ARCHIVE || false,
  archiveItemsToShow: ARCHIVE_ITEMS_TO_SHOW || 15,
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  bio: Yup.string()
    .test('word-count', 'Bio must be 1-6 words', (value) => {
      const wordCount = value ? value.trim().split(/\s+/).length : 0;
      return wordCount >= 1 && wordCount <= 6;
    })
    .required('Bio is required'),
  description: Yup.string().required('Description is required'),
  logo: Yup.mixed()
    .nullable()
    .test(
      'fileSize',
      'File too large',
      (value) => !value || (value instanceof File && value.size <= 10000000),
    )
    .test(
      'fileType',
      'Unsupported Format',
      (value) =>
        !value ||
        (value instanceof File &&
          ['image/jpeg', 'image/png', 'image/webp'].includes(value.type)),
    )
    .test('nonNull', 'Logo cannot be null', function (value) {
      const { logoData } = this.parent;
      return !!value || !!logoData;
    }),
  googleAnalyticsId: Yup.string().matches(
    /^(UA-\d+-\d+|G-\w{10})$/,
    'Invalid Google Analytics ID',
  ),
  socialLinks: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('Social link type is required'),
      url: Yup.string()
        .url('Must be a valid URL')
        .required('Social link URL is required'),
    }),
  ),
  email: Yup.string().email('Invalid email format'),
  keywords: Yup.array()
    .of(Yup.string())
    .max(10, 'Maximum of 10 keywords is recommended.'),
  ctaSocialPlatform: Yup.string().required('CTA Social Platform is required'),
  headshot: Yup.mixed()
    .nullable()
    .when('useLogoForHeadshot', {
      is: false,
      then: (schema) =>
        schema
          .nullable()
          .test(
            'fileSize',
            'File too large',
            (value) =>
              !value || (value instanceof File && value.size <= 10000000),
          )
          .test(
            'fileType',
            'Unsupported Format',
            (value) =>
              !value ||
              (value instanceof File &&
                ['image/jpeg', 'image/png', 'image/webp'].includes(value.type)),
          )
          .test('nonNull', 'Headshot cannot be null', function (value) {
            const { headshotData } = this.parent;
            return !!value || !!headshotData;
          }),
      otherwise: (schema) => schema.nullable(),
    }),
  archiveItemsToShow: Yup.number().when('useArchive', {
    is: true,
    then: (schema) =>
      schema
        .min(1, 'Must be at least 1')
        .max(100, 'Must be less than or equal to 100')
        .required('Number of items to show is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

// List of all social platforms
const socialPlatforms: SocialPlatform[] = [
  'github',
  'twitter',
  'linkedin',
  'reddit',
  'strava',
  'tiktok',
  'patreon',
  'instagram',
  'youtube',
];

type EditBlogFormProps = {
  toggleModal: () => void;
  showToast: (message: string, isSuccess: boolean) => void;
};

const EditBlogForm: React.FC<EditBlogFormProps> = ({
  toggleModal,
  showToast,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [logoPreview, setLogoPreview] = useState<string | null>(
    AUTHOR.publisherLogo || null,
  );
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [headshotPreview, setHeadshotPreview] = useState<string | null>(
    defaultInitialValues.useLogoForHeadshot
      ? (defaultInitialValues.logoData ?? null)
      : (defaultInitialValues.headshotData ?? null),
  );
  const [headshotPreviewUrl, setHeadshotPreviewUrl] = useState<string | null>(
    null,
  );
  const router = useRouter();

  const handleModalClose = () => {
    router.push('/');
    router.refresh();
    toggleModal();
  };

  const formik = useFormik({
    initialValues: defaultInitialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: FormData, { setSubmitting }) => {
      try {
        // Preprocess values
        const processedValues = {
          ...values,
          socialLinks: Object.keys(SOCIAL_URLS).map((type) => {
            const existingLink = values.socialLinks.find(
              (link) => link.type === type,
            );
            return {
              type,
              url: existingLink?.url || '',
            };
          }),
          ctaSocialPlatform: values.ctaSocialPlatform,
          headshotData: values.useLogoForHeadshot
            ? values.logoData
            : values.headshotData,
          useLogoForHeadshot: values.useLogoForHeadshot,
          useArchive: values.useArchive,
          archiveItemsToShow: values.archiveItemsToShow,
        };

        const response = await fetch('/api/blog/update-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(processedValues),
        });

        const result = await response.json();

        if (result.success) {
          handleModalClose();
          showToast('Blog configuration updated successfully.', true);
        } else {
          showToast(
            `Failed to update blog configuration: ${result.error}.`,
            false,
          );
        }
      } catch (error) {
        console.error('Error updating configuration:', error);
        showToast('An error occurred while updating the configuration.', false);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    values,
    setFieldValue,
    isSubmitting,
    validateForm,
    setFieldTouched,
    handleSubmit,
    handleChange,
    touched,
    errors,
  } = formik;

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFieldValue('logo', file);

      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl);
      }

      const previewUrl = URL.createObjectURL(file);
      setLogoPreviewUrl(previewUrl);
      setLogoPreview(previewUrl);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setFieldValue('logoData', base64data);
      };
    }
  };

  const dropzone = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles),
    accept: { 'image/*': ['.jpeg', '.png', '.webp'] },
    maxSize: 10000000,
  });
  const { getRootProps, getInputProps, isDragActive } = dropzone;

  // Handle headshot image drop
  const handleHeadshotDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFieldValue('headshot', file);

      if (headshotPreviewUrl) {
        URL.revokeObjectURL(headshotPreviewUrl);
      }

      const previewUrl = URL.createObjectURL(file);
      setHeadshotPreviewUrl(previewUrl);
      setHeadshotPreview(previewUrl);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setFieldValue('headshotData', base64data);
      };
    }
  };

  const headshotDropzone = useDropzone({
    onDrop: (acceptedFiles) => handleHeadshotDrop(acceptedFiles),
    accept: { 'image/*': ['.jpeg', '.png', '.webp'] },
    maxSize: 10000000,
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleKeywordInput = (
    e: ChangeEvent<HTMLInputElement>,
    keywords: string[],
  ) => {
    const inputValue = e.target.value.trim();
    if (inputValue.endsWith(',')) {
      const keyword = inputValue.slice(0, -1).trim();
      if (keyword && !keywords.includes(keyword)) {
        setFieldValue('keywords', [...keywords, keyword]);
      }
      e.target.value = '';
    }
  };

  const removeKeyword = (index: number, keywords: string[]) => {
    const updatedKeywords = keywords.filter((_, i) => i !== index);
    setFieldValue('keywords', updatedKeywords);
  };

  const handleNext = () => {
    validateForm().then((errors) => {
      const currentStepFields = fieldsPerStep[step];
      currentStepFields.forEach((field) => setFieldTouched(field, true));
      const hasErrors = currentStepFields.some((field) => getIn(errors, field));
      if (!hasErrors) {
        nextStep();
      }
    });
  };

  const getFieldClassName = (fieldName: keyof FormData) => {
    const isDefault = values[fieldName] === defaultInitialValues[fieldName];
    return `w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white ${
      isDefault ? 'bg-gray-200 dark:bg-gray-800' : ''
    }`;
  };

  const fieldsPerStep: Record<number, string[]> = {
    1: ['fullName', 'bio', 'description', 'vercelUrl'],
    2: [
      'logo',
      //       'useLogoInNavbar',
      'headshot',
      'useLogoForHeadshot',
      'keywords',
    ],
    3: ['email', 'socialLinks', 'ctaSocialPlatform'],
    4: [
      'vercelAnalyticsEnabled',
      'googleAnalyticsId',
      'useArchive',
      'archiveItemsToShow',
    ],
  };

  //   useEffect(() => {
  //     if (values.useLogoForHeadshot) {
  //       setHeadshotPreview(logoPreview);
  //       setFieldValue('headshotData', values.logoData);
  //     } else {
  //       setHeadshotPreview(values.headshotData || null);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [values.useLogoForHeadshot, logoPreview]);

  return (
    <FormikProvider value={formik}>
      <form
        className="max-w-xl mx-auto p-8 space-y-4 h-[75vh] flex flex-col"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default behavior of submitting the form
            validateForm().then((errors) => {
              const currentStepFields = fieldsPerStep[step];
              currentStepFields.forEach((field) =>
                setFieldTouched(field, true),
              );
              const hasErrors = currentStepFields.some((field) =>
                getIn(errors, field),
              );
              if (!hasErrors) {
                if (step < totalSteps) {
                  nextStep();
                } else {
                  handleSubmit();
                }
              }
            });
          }
        }}
        onSubmit={handleSubmit}
      >
        {/* Steps Indicator */}
        <div className="mb-4 px-1">
          <div className="flex justify-between">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-2 w-full ${
                  i + 1 <= step
                    ? 'bg-black dark:bg-white'
                    : 'bg-gray-200 dark:bg-[#252525]'
                } ${i < totalSteps - 1 ? 'mr-1' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto space-y-4 px-1">
          {/* Profile Step */}
          {step === 1 && (
            <>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  className={getFieldClassName('fullName')}
                  value={values.fullName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const fullName = e.target.value;
                    setFieldValue('fullName', fullName);
                    setFieldValue(
                      'vercelUrl',
                      `https://${fullName
                        .toLowerCase()
                        .replace(/\s+/g, '')}.vercel.app`,
                    );
                  }}
                />
                {touched.fullName && errors.fullName && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Vercel URL</label>
                <input
                  name="vercelUrl"
                  type="url"
                  placeholder="Vercel URL"
                  className={getFieldClassName('vercelUrl')}
                  value={values.vercelUrl}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Bio</label>
                <input
                  name="bio"
                  type="text"
                  placeholder="Bio"
                  className={getFieldClassName('bio')}
                  value={values.bio}
                  onChange={handleChange}
                />
                {touched.bio && errors.bio && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.bio}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  className={getFieldClassName('description')}
                  rows={6}
                  value={values.description}
                  onChange={handleChange}
                />
                {touched.description && errors.description && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.description}
                  </span>
                )}
              </div>
            </>
          )}

          {/* SEO Step */}
          {step === 2 && (
            <>
              {/* Logo Field with Tooltip */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <label className="font-semibold">Logo</label>
                  {/* Remove TooltipWrapper if not used */}
                  {/* <TooltipWrapper message="This logo will be used for the favicon, PWA, and default SEO image."> */}
                  {/*   <Info */}
                  {/*     className="text-gray-500 dark:text-gray-400 ml-2" */}
                  {/*     size={16} */}
                  {/*   /> */}
                  {/* </TooltipWrapper> */}
                </div>
                <div
                  {...getRootProps()}
                  className={`w-full p-4 border border-dashed rounded-lg cursor-pointer flex justify-center items-center transition duration-300 ease-in-out ${
                    isDragActive
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 hover:border-black dark:border-gray-700 dark:hover:border-white'
                  }`}
                >
                  <input {...getInputProps()} />
                  {logoPreview ? (
                    <Image
                      src={logoPreview}
                      alt="Logo Preview"
                      width={150}
                      height={150}
                      unoptimized
                      className="object-contain"
                    />
                  ) : (
                    <div className="text-center my-8">
                      <ImageIcon className="mx-auto text-gray-500" size={40} />
                      <p className="text-gray-500 text-sm">
                        <b>Click to upload</b> or drag and drop <br />
                        PNG, JPG or GIF (max. 5MB)
                      </p>
                    </div>
                  )}
                </div>
                {touched.logo && errors.logo && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.logo}
                  </span>
                )}
                <p className="text-sm text-gray-500 mt-4">
                  Recommended image dimensions: at least 520x520px.
                </p>
              </div>

              {/* <div className="mb-4 flex items-center">
                <Switch
                  checked={values.useLogoInNavbar}
                  onChange={(checked) =>
                    setFieldValue('useLogoInNavbar', checked)
                  }
                  onColor={'#DC70FF'}
                  offColor="#ccc"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={40}
                  className="mr-2"
                />
                <label className="font-semibold">Use Logo in Navbar</label>
              </div>*/}

              {/* Headshot Field */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <label className="font-semibold">Headshot</label>
                  {/* Remove TooltipWrapper if not used */}
                  {/* <TooltipWrapper message="This will be shown on your about page."> */}
                  {/*   <Info */}
                  {/*     className="text-gray-500 dark:text-gray-400 ml-2" */}
                  {/*     size={16} */}
                  {/*   /> */}
                  {/* </TooltipWrapper> */}
                </div>
                {!values.useLogoForHeadshot && (
                  <div
                    {...headshotDropzone.getRootProps()}
                    className={`w-full p-4 border border-dashed rounded-lg cursor-pointer flex justify-center items-center transition duration-300 ease-in-out ${
                      headshotDropzone.isDragActive
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-300 hover:border-black dark:border-gray-700 dark:hover:border-white'
                    }`}
                  >
                    <input {...headshotDropzone.getInputProps()} />
                    {headshotPreview ? (
                      <Image
                        src={headshotPreview}
                        alt="Headshot Preview"
                        width={150}
                        height={150}
                        unoptimized
                        className="object-contain"
                      />
                    ) : (
                      <div className="text-center my-8">
                        <ImageIcon
                          className="mx-auto text-gray-500"
                          size={40}
                        />
                        <p className="text-gray-500 text-sm">
                          <b>Click to upload</b> or drag and drop <br />
                          PNG, JPG or GIF (max. 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {touched.headshot && errors.headshot && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.headshot}
                  </span>
                )}
                <div className="mb-4 flex items-center">
                  <Switch
                    checked={values.useLogoForHeadshot}
                    onChange={(checked) => {
                      setFieldValue('useLogoForHeadshot', checked);
                      if (checked) {
                        setHeadshotPreview(logoPreview);
                        setFieldValue('headshotData', values.logoData);
                      } else {
                        setHeadshotPreview(null);
                        setFieldValue('headshotData', null);
                      }
                    }}
                    onColor={'#DC70FF'}
                    offColor="#ccc"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    height={20}
                    width={40}
                    className="mr-2"
                  />
                  <label className="font-semibold">Use logo for headshot</label>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <label className="font-semibold">Keywords</label>
                  {/* Remove TooltipWrapper if not used */}
                  {/* <TooltipWrapper message="Adding keywords helps improve your website's ranking in search engines."> */}
                  {/*   <Info */}
                  {/*     className="text-gray-500 dark:text-gray-400 ml-2" */}
                  {/*     size={16} */}
                  {/*   /> */}
                  {/* </TooltipWrapper> */}
                </div>
                <input
                  type="text"
                  placeholder="Enter keywords separated by commas"
                  className={getFieldClassName('keywords')}
                  onChange={(e) => handleKeywordInput(e, values.keywords)}
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {values.keywords.map((keyword, index) => {
                    const isDefault =
                      defaultInitialValues.keywords.includes(keyword);
                    return (
                      <span
                        key={index}
                        onClick={() => removeKeyword(index, values.keywords)}
                        className={`cursor-pointer text-xs border border-gray-400 text-black dark:text-white dark:text-[#999999] px-2 py-2 flex items-center ${
                          isDefault ? 'bg-gray-200 dark:bg-gray-800' : ''
                        }`}
                      >
                        {keyword}
                        <XIcon size={12} className="ml-1" />
                      </span>
                    );
                  })}
                </div>
                {touched.keywords && errors.keywords && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.keywords}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Social Links Step */}
          {step === 3 && (
            <>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={getFieldClassName('email')}
                  value={values.email}
                  onChange={handleChange}
                />
                {touched.email && errors.email && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Social Links</label>
                <FieldArray name="socialLinks">
                  {({ push, remove }) => (
                    <div>
                      {values.socialLinks.map((link, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <select
                            name={`socialLinks[${index}].type`}
                            className={`w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white mr-2 ${
                              link.type ===
                              defaultInitialValues.socialLinks[index]?.type
                                ? 'bg-gray-200 dark:bg-gray-800'
                                : ''
                            }`}
                            value={link.type}
                            onChange={handleChange}
                          >
                            <option value="">Select Social</option>
                            {socialPlatforms.map((platform) => (
                              <option key={platform} value={platform}>
                                {platform.charAt(0).toUpperCase() +
                                  platform.slice(1)}
                              </option>
                            ))}
                          </select>
                          <input
                            name={`socialLinks[${index}].url`}
                            type="url"
                            placeholder="URL"
                            className={`w-2/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white mr-2 ${
                              link.url ===
                              defaultInitialValues.socialLinks[index]?.url
                                ? 'bg-gray-200 dark:bg-gray-800'
                                : ''
                            }`}
                            value={link.url}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500"
                          >
                            <XIcon size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ type: '', url: '' })}
                        className="text-blue-500"
                      >
                        + Add Social Link
                      </button>
                    </div>
                  )}
                </FieldArray>
                {touched.socialLinks &&
                  typeof errors.socialLinks === 'string' && (
                    <span className="text-xs text-red-500 mt-1">
                      {errors.socialLinks}
                    </span>
                  )}
                {touched.socialLinks &&
                  Array.isArray(errors.socialLinks) &&
                  errors.socialLinks.map((error, index) => {
                    if (error && typeof error === 'object') {
                      return (
                        <span key={index} className="text-xs text-red-500 mt-1">
                          {error.type || error.url}
                        </span>
                      );
                    }
                    return null;
                  })}
              </div>

              {/* CTA Social Platform */}
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <label className="font-semibold">CTA Social Platform</label>
                  {/* Remove TooltipWrapper if not used */}
                  {/* <TooltipWrapper message="This will be the link in the navbar."> */}
                  {/*   <Info */}
                  {/*     className="text-gray-500 dark:text-gray-400 ml-2" */}
                  {/*     size={16} */}
                  {/*   /> */}
                  {/* </TooltipWrapper> */}
                </div>
                <select
                  name="ctaSocialPlatform"
                  className={getFieldClassName('ctaSocialPlatform')}
                  value={values.ctaSocialPlatform}
                  onChange={handleChange}
                >
                  <option value="">Select Social Platform</option>
                  {values.socialLinks.map((link) => (
                    <option key={link.type} value={link.type}>
                      {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                    </option>
                  ))}
                </select>
                {touched.ctaSocialPlatform && errors.ctaSocialPlatform && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.ctaSocialPlatform}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Preferences Step */}
          {step === 4 && (
            <>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Google Analytics ID
                </label>
                <input
                  name="googleAnalyticsId"
                  type="text"
                  placeholder="Google Analytics ID"
                  className={getFieldClassName('googleAnalyticsId')}
                  value={values.googleAnalyticsId}
                  onChange={handleChange}
                />
                {touched.googleAnalyticsId && errors.googleAnalyticsId && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.googleAnalyticsId}
                  </span>
                )}
              </div>
              <div className="mb-4 flex items-center">
                <Switch
                  checked={values.vercelAnalyticsEnabled}
                  onChange={(checked) =>
                    setFieldValue('vercelAnalyticsEnabled', checked)
                  }
                  onColor={'#DC70FF'}
                  offColor="#ccc"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={40}
                  className="mr-2"
                />
                <label className="font-semibold">Enable Vercel Analytics</label>
              </div>

              {/* Use Archive Switch */}
              <div className="mb-4 flex items-center">
                <Switch
                  checked={values.useArchive}
                  onChange={(checked) => setFieldValue('useArchive', checked)}
                  onColor={'#DC70FF'}
                  offColor="#ccc"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={40}
                  className="mr-2"
                />
                <label className="font-semibold">Use Archive</label>
              </div>

              {values.useArchive && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <label className="font-semibold">
                      Number of items to show in archive
                    </label>
                    {/* Remove TooltipWrapper if not used */}
                    {/* <TooltipWrapper message="A recommended number of items for the archive is between 10 and 20 for optimal user experience."> */}
                    {/*   <Info */}
                    {/*     className="text-gray-500 dark:text-gray-400 ml-2" */}
                    {/*     size={16} */}
                    {/*   /> */}
                    {/* </TooltipWrapper> */}
                  </div>
                  <input
                    name="archiveItemsToShow"
                    type="number"
                    placeholder="Number of items"
                    className={getFieldClassName('archiveItemsToShow')}
                    value={values.archiveItemsToShow}
                    onChange={handleChange}
                  />
                  {touched.archiveItemsToShow && errors.archiveItemsToShow && (
                    <span className="text-xs text-red-500 mt-1">
                      {errors.archiveItemsToShow}
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`font-semibold px-4 py-2 rounded-md border ${
              step === 1
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-gray-500 text-gray-700 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-600 dark:border-gray-400 dark:text-[#999999]'
            }`}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={(e) => {
              if (step === totalSteps) {
                e.preventDefault();
                handleSubmit();
              } else {
                handleNext();
              }
            }}
            className="px-6 py-2 rounded-md font-semibold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300"
            disabled={isSubmitting}
          >
            {step === totalSteps ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default EditBlogForm;
