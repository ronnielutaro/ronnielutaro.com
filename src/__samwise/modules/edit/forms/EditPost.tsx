'use client';

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { useFormik, FormikProvider, getIn } from 'formik';
import { useDropzone } from 'react-dropzone';
import * as Yup from 'yup';
import Switch from 'react-switch';
import { Post } from '../../../../app/get-posts';
import { ImageIcon, XIcon, Info } from 'lucide-react';
import TooltipWrapper from '@/components/tooltip'; // Adjust the path as necessary
import { AUTHOR } from '@/config';
import { toast } from 'react-toastify';

interface EditPostFormProps {
  currentPost?: Post | null;
  onSuccess?: () => void; // Add the onSuccess prop
}

const EditPostForm: React.FC<EditPostFormProps> = ({
  currentPost,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [imagePreview, setImagePreview] = useState<string | null>(
    currentPost?.image || null,
  );

  const formik = useFormik({
    initialValues: {
      originalSlug: currentPost?.slug || '',
      image: null as File | null,
      imageBase64: '',
      title: currentPost?.title || '',
      slug: currentPost?.slug || '',
      date: currentPost?.date ? new Date(currentPost.date) : new Date(),
      draft: currentPost?.draft ?? true,
      keywords: currentPost?.keywords || [],
      author: currentPost?.author || AUTHOR.name || 'Default Author',
      authorUrl: currentPost?.authorUrl || AUTHOR.url,
      description: currentPost?.description || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      slug: Yup.string()
        .matches(
          /^[a-z0-9-]+$/,
          'Slug must only contain lowercase letters, numbers, and hyphens',
        )
        .required('Slug is required'),
      date: Yup.date().required('Date is required'),
      author: Yup.string().required('Author is required'),
      authorUrl: Yup.string()
        .url('Invalid URL format')
        .required('Author URL is required'),
      description: Yup.string()
        .max(200, 'Description must be 200 characters or less')
        .required('Description is required'),
      keywords: Yup.array()
        .of(Yup.string())
        .min(1, 'At least one keyword is required')
        .max(10, 'Maximum of 10 keywords allowed'),
      image: Yup.mixed()
        .nullable()
        .test(
          'fileSize',
          'File too large',
          (value) => !value || (value instanceof File && value.size <= 5000000),
        )
        .test('fileType', 'Unsupported Format', (value) =>
          value instanceof File
            ? ['image/jpeg', 'image/png', 'image/webp'].includes(value.type)
            : true,
        ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const endpoint = currentPost
          ? '/api/blog/update-post'
          : '/api/blog/create-post';

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...values,
            image: values.imageBase64 || values.image,
          }),
        });

        if (!response.ok) {
          console.error(`Server returned ${response.status}`);
          toast.error(`Failed to ${currentPost ? 'update' : 'create'} post.`);
          return;
        }

        const result = await response.json();
        if (result.success) {
          toast.success(
            `Post ${currentPost ? 'updated' : 'created'} successfully!`,
          );
          if (onSuccess) {
            onSuccess(); // Call the onSuccess callback
          }
        } else {
          toast.error(
            `Failed to ${currentPost ? 'update' : 'create'} post: ${result.message}`,
          );
        }
      } catch (error) {
        console.error('Error submitting post:', error);
        toast.error('An unexpected error occurred while submitting the post.');
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
    errors,
    touched,
  } = formik;

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFieldValue('image', file);

      // Generate a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Convert the file to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setFieldValue('imageBase64', base64data);
      };
      reader.readAsDataURL(file); // Read file as Base64
    }
  };

  const dropzone = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles),
    accept: { 'image/*': ['.jpeg', '.png', '.webp'] },
    maxSize: 5000000,
  });
  const { getRootProps, getInputProps, isDragActive } = dropzone;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleKeywordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    if (inputValue.endsWith(',')) {
      const keyword = inputValue.slice(0, -1).trim();
      if (keyword && !values.keywords.includes(keyword)) {
        setFieldValue('keywords', [...values.keywords, keyword]);
      }
      e.target.value = '';
    }
  };

  const removeKeyword = (index: number) => {
    const updatedKeywords = values.keywords.filter((_, i) => i !== index);
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

  const getFieldClassName = (fieldName: string) => {
    return `w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
      getIn(errors, fieldName) && getIn(touched, fieldName)
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:ring-black dark:focus:ring-white'
    }`;
  };

  const fieldsPerStep: Record<number, string[]> = {
    1: ['image', 'title', 'slug', 'draft'],
    2: ['date', 'keywords', 'description'],
    3: ['author', 'authorUrl'],
  };

  return (
    <FormikProvider value={formik}>
      <form
        className="max-w-xl mx-auto p-8 space-y-4 h-[75vh] flex flex-col"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default form submission
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
        {/* Step Indicators */}
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

        {/* Step Content */}
        <div className="flex-grow overflow-y-auto space-y-4 px-1">
          {step === 1 && (
            <>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Image</label>
                <div
                  {...getRootProps()}
                  className={`w-full p-4 border border-dashed rounded-lg cursor-pointer flex justify-center items-center transition duration-300 ease-in-out ${
                    isDragActive
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 hover:border-black dark:border-gray-700 dark:hover:border-white'
                  }`}
                >
                  <input {...getInputProps()} />
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Image Preview"
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
                        PNG, JPG, or GIF (max. 5MB)
                      </p>
                    </div>
                  )}
                </div>
                {touched.image && errors.image && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.image}
                  </span>
                )}
                <p className="text-sm text-gray-500 mt-4">
                  Recommended image dimensions: at least 520x520px.
                </p>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Title</label>
                <input
                  name="title"
                  type="text"
                  placeholder="Title"
                  className={getFieldClassName('title')}
                  value={values.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const title = e.target.value;
                    const slug = title
                      .toLowerCase()
                      .replace(/[^a-z0-9 ]/g, '')
                      .replace(/\s+/g, '-');
                    setFieldValue('title', title);
                    setFieldValue('slug', slug);
                  }}
                />
                {touched.title && errors.title && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.title}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-semibold">Slug</label>
                <input
                  name="slug"
                  type="text"
                  placeholder="Slug"
                  className={getFieldClassName('slug')}
                  value={values.slug}
                  readOnly
                />
                {touched.slug && errors.slug && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.slug}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <label className="block mb-1 font-semibold mr-2">Draft</label>
                <Switch
                  checked={values.draft}
                  onChange={(checked) => setFieldValue('draft', checked)}
                  onColor="#DC70FF"
                  offColor="#ccc"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={40}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block mb-1 font-semibold">Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  rows={4}
                  className={getFieldClassName('description')}
                  value={values.description}
                  onChange={(e) => setFieldValue('description', e.target.value)}
                />
                {touched.description && errors.description && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.description}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <label className="font-semibold">Keywords</label>
                  {/* Add a tooltip or additional info if needed */}
                </div>
                <input
                  type="text"
                  placeholder="Enter keywords separated by commas"
                  className={getFieldClassName('keywords')}
                  onChange={handleKeywordInput}
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {values.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      onClick={() => removeKeyword(index)}
                      className={`cursor-pointer text-xs border border-gray-400 text-black dark:text-white dark:text-[#999999] px-2 py-2 flex items-center`}
                    >
                      {keyword}
                      <XIcon size={12} className="ml-1" />
                    </span>
                  ))}
                </div>
                {touched.keywords && errors.keywords && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.keywords}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-semibold">Date</label>
                <input
                  type="date"
                  name="date"
                  className={getFieldClassName('date')}
                  value={values.date.toISOString().split('T')[0]}
                  onChange={(e) =>
                    setFieldValue('date', new Date(e.target.value))
                  }
                />
                {touched.date && typeof errors.date === 'string' && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.date}
                  </span>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block mb-1 font-semibold">Author</label>
                <input
                  name="author"
                  type="text"
                  placeholder="Author"
                  className={getFieldClassName('author')}
                  value={values.author}
                  onChange={(e) => setFieldValue('author', e.target.value)}
                />
                {touched.author && errors.author && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.author}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-semibold">Author URL</label>
                <input
                  name="authorUrl"
                  type="url"
                  placeholder="Author URL"
                  className={getFieldClassName('authorUrl')}
                  value={values.authorUrl}
                  onChange={(e) => setFieldValue('authorUrl', e.target.value)}
                />
                {touched.authorUrl && errors.authorUrl && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.authorUrl}
                  </span>
                )}
              </div>
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
            onClick={() =>
              step === totalSteps ? handleSubmit() : handleNext()
            }
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

export default EditPostForm;
