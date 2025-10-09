# User Flow Diagrams

This document visualizes the user journeys and interactions across the portfolio website using Mermaid diagrams.

---

## 1. Overall Site Navigation Flow

```mermaid
graph TD
    Start([User Lands on Site]) --> Home[Home Page]
    
    Home --> HeroSection[Hero Section]
    Home --> AboutSection[About Section]
    Home --> FeaturedWork[Featured Work]
    Home --> LatestPosts[Latest Writing]
    Home --> Timeline[Professional Timeline]
    Home --> NewsletterCTA[Newsletter Signup]
    
    HeroSection --> |Click 'View My Work'| FeaturedWork
    HeroSection --> |Click 'Read My Thoughts'| BlogPage[Writing/Blog Page]
    HeroSection --> |Click 'Get In Touch'| ContactPage[Contact Page]
    
    FeaturedWork --> |Click Project| ProjectDetail[Project Detail/Case Study]
    LatestPosts --> |Click Post| BlogPost[Individual Blog Post]
    LatestPosts --> |Click 'Read More'| BlogPage
    
    Home --> NavBar[Navigation Bar]
    NavBar --> Home
    NavBar --> BlogPage
    NavBar --> ContactPage
    NavBar --> |Toggle| ThemeSwitch[Dark/Light Mode]
    
    BlogPage --> BlogPost
    ContactPage --> FormSubmit{Form Submitted?}
    FormSubmit --> |Yes| ThankYou[Thank You Message]
    FormSubmit --> |No| ContactPage
    
    BlogPost --> RelatedPosts[Related Posts]
    BlogPost --> NewsletterSignup[Newsletter Signup]
    RelatedPosts --> BlogPost
    
    NewsletterCTA --> |Submit Email| NewsletterConfirm[Confirmation Message]
    NewsletterSignup --> |Submit Email| NewsletterConfirm
    
    style Home fill:#e1f5ff
    style BlogPage fill:#fff4e1
    style ContactPage fill:#e8f5e9
    style BlogPost fill:#fff4e1
```

---

## 2. Homepage User Journey

```mermaid
graph TD
    Landing([User Arrives]) --> Hero[Hero Section with Animation]
    
    Hero --> ReadTagline["Read: Product Manager & Software Engineer"]
    ReadTagline --> CTAButtons{Choose Action}
    
    CTAButtons --> |Interested in Work| ScrollWork[Scroll to Featured Work]
    CTAButtons --> |Interested in Writing| GoToBlog[Navigate to Blog]
    CTAButtons --> |Want to Connect| GoToContact[Navigate to Contact]
    
    ScrollWork --> ViewProjects[View Project Cards]
    ViewProjects --> HoverProject[Hover on Project Card]
    HoverProject --> RevealDetails[Reveal: Tech Stack & Details]
    RevealDetails --> ClickProject{Click Project?}
    ClickProject --> |Yes| ProjectPage[Project Case Study Page]
    ClickProject --> |No| ContinueScroll[Continue Scrolling]
    
    ContinueScroll --> AboutSection[About Section]
    AboutSection --> ReadBio[Read Professional Summary]
    ReadBio --> ViewSkills[View Animated Skill Tags]
    ViewSkills --> LearnAboutStartHub[Learn About StartHub Work]
    LearnAboutStartHub --> DiscoverRocketize[Discover Rocketize Project]
    
    DiscoverRocketize --> ScrollTimeline[Scroll to Timeline]
    ScrollTimeline --> ViewTimeline[Interactive Timeline]
    ViewTimeline --> ExpandMilestone{Expand Milestone?}
    ExpandMilestone --> |Yes| ViewDetails[View Milestone Details]
    ExpandMilestone --> |No| ContinueDown[Continue Scrolling]
    
    ViewDetails --> ContinueDown
    ContinueDown --> LatestWriting[Latest Writing Section]
    LatestWriting --> PreviewPosts[Preview 3 Recent Posts]
    PreviewPosts --> ReadExcerpt[Read Excerpts]
    ReadExcerpt --> ClickPost{Interested in Post?}
    ClickPost --> |Yes| ReadFullPost[Go to Full Blog Post]
    ClickPost --> |No| Newsletter[Newsletter Signup Section]
    
    Newsletter --> EnterEmail{Sign Up?}
    EnterEmail --> |Yes| SubmitEmail[Submit Email Address]
    EnterEmail --> |No| Footer[Scroll to Footer]
    
    SubmitEmail --> ValidationCheck{Valid Email?}
    ValidationCheck --> |Yes| SuccessMessage[Show Success Message]
    ValidationCheck --> |No| ErrorMessage[Show Error Message]
    ErrorMessage --> Newsletter
    
    SuccessMessage --> Footer
    Footer --> SocialLinks[View Social Links]
    Footer --> QuickNav[Quick Navigation]
    Footer --> BackToTop[Click 'Back to Top']
    
    BackToTop --> Hero
    SocialLinks --> ExternalProfile[Visit LinkedIn/GitHub/Twitter]
    
    style Hero fill:#bbdefb
    style AboutSection fill:#c8e6c9
    style LatestWriting fill:#fff9c4
    style Newsletter fill:#f8bbd0
```

---

## 3. Blog/Writing Page User Flow

```mermaid
graph TD
    EnterBlog([User Enters Writing Page]) --> BlogHero[Blog Page Header]
    
    BlogHero --> ViewAllPosts[View Blog Post Grid]
    ViewAllPosts --> BrowseOptions{How to Browse?}
    
    BrowseOptions --> |Search| UseSearch[Use Search Bar]
    BrowseOptions --> |Filter| UseFilters[Use Category Filters]
    BrowseOptions --> |Browse All| ScrollPosts[Scroll Through Posts]
    
    UseSearch --> TypeQuery[Type Search Query]
    TypeQuery --> LiveFilter[Live Results Update]
    LiveFilter --> ViewResults[View Filtered Results]
    
    UseFilters --> SelectCategory[Select Category]
    SelectCategory --> |Product Management| PMPosts[Show PM Posts]
    SelectCategory --> |Engineering| EngPosts[Show Engineering Posts]
    SelectCategory --> |Lessons| LessonPosts[Show Lessons Posts]
    SelectCategory --> |Stories| StoryPosts[Show Story Posts]
    SelectCategory --> |Projects| ProjectPosts[Show Project Posts]
    
    PMPosts --> ViewResults
    EngPosts --> ViewResults
    LessonPosts --> ViewResults
    StoryPosts --> ViewResults
    ProjectPosts --> ViewResults
    
    ViewResults --> SortOptions{Change Sort?}
    SortOptions --> |Latest| SortLatest[Sort by Latest]
    SortOptions --> |Popular| SortPopular[Sort by Popular]
    SortOptions --> |Oldest| SortOldest[Sort by Oldest]
    SortOptions --> |Keep Current| ViewCards[View Post Cards]
    
    SortLatest --> ViewCards
    SortPopular --> ViewCards
    SortOldest --> ViewCards
    
    ScrollPosts --> ViewCards
    ViewCards --> HoverCard[Hover on Post Card]
    HoverCard --> LiftEffect[Card Lift Animation]
    LiftEffect --> ReadPreview[Read Title & Excerpt]
    ReadPreview --> CheckMeta[Check Reading Time & Date]
    CheckMeta --> DecideRead{Interested?}
    
    DecideRead --> |Yes| ClickPost[Click on Post]
    DecideRead --> |No| NextPost[Browse Next Post]
    NextPost --> ViewCards
    
    ClickPost --> LoadPost[Load Individual Post Page]
    
    style BlogHero fill:#e1bee7
    style UseSearch fill:#fff9c4
    style UseFilters fill:#b2dfdb
    style LoadPost fill:#ffccbc
```

---

## 4. Individual Blog Post User Flow

```mermaid
graph TD
    PostLoad([Blog Post Loads]) --> HeroImage[View Hero Image & Title]
    
    HeroImage --> ViewMeta[View Metadata Bar]
    ViewMeta --> CheckTOC{See Table of Contents?}
    
    CheckTOC --> |Desktop| StickyTOC[Sticky TOC Sidebar]
    CheckTOC --> |Mobile| CollapsedTOC[Collapsed TOC]
    
    StickyTOC --> StartReading[Start Reading Content]
    CollapsedTOC --> StartReading
    
    StartReading --> ProgressBar[Progress Bar Appears]
    ProgressBar --> ReadContent[Read MDX Content]
    
    ReadContent --> InteractContent{Interaction?}
    
    InteractContent --> |Code Block| ViewCode[View Syntax Highlighted Code]
    InteractContent --> |Copy Code| ClickCopy[Click Copy Button]
    InteractContent --> |Image| ClickImage[Click Image]
    InteractContent --> |Heading| ClickHeading[Click Heading Link]
    InteractContent --> |Keep Reading| ContinueRead[Continue Reading]
    
    ViewCode --> ContinueRead
    ClickCopy --> CopySuccess[Show Copy Success]
    CopySuccess --> ContinueRead
    
    ClickImage --> Lightbox[Open Image Lightbox]
    Lightbox --> CloseLight[Close Lightbox]
    CloseLight --> ContinueRead
    
    ClickHeading --> DeepLink[Copy Deep Link]
    DeepLink --> ContinueRead
    
    ContinueRead --> ScrollProgress{Scrolling?}
    ScrollProgress --> |Yes| UpdateProgress[Update Progress Bar]
    UpdateProgress --> ReadContent
    ScrollProgress --> |Reached End| EndContent[Finish Reading]
    
    EndContent --> ShareSection[Social Share Buttons]
    ShareSection --> ShareAction{Share Post?}
    
    ShareAction --> |Twitter| ShareTwitter[Share on Twitter]
    ShareAction --> |LinkedIn| ShareLinkedIn[Share on LinkedIn]
    ShareAction --> |Copy Link| CopyLink[Copy Post Link]
    ShareAction --> |No Thanks| AuthorBio[View Author Bio]
    
    ShareTwitter --> AuthorBio
    ShareLinkedIn --> AuthorBio
    CopyLink --> LinkCopied[Link Copied Confirmation]
    LinkCopied --> AuthorBio
    
    AuthorBio --> RelatedPosts[View Related Posts]
    RelatedPosts --> ClickRelated{Click Related Post?}
    ClickRelated --> |Yes| NewPost[Load New Post]
    ClickRelated --> |No| NewsletterCTA[Newsletter Signup CTA]
    
    NewPost --> PostLoad
    
    NewsletterCTA --> SignupDecision{Sign Up?}
    SignupDecision --> |Yes| EnterEmail[Enter Email]
    SignupDecision --> |No| Navigation[Navigate Elsewhere]
    
    EnterEmail --> Validate{Valid Email?}
    Validate --> |Yes| Subscribed[Success: Subscribed]
    Validate --> |No| ShowError[Show Validation Error]
    ShowError --> EnterEmail
    
    Subscribed --> PrevNext[Prev/Next Post Navigation]
    Navigation --> PrevNext
    
    PrevNext --> NavChoice{Navigate?}
    NavChoice --> |Previous Post| PrevPost[Load Previous Post]
    NavChoice --> |Next Post| NextPost[Load Next Post]
    NavChoice --> |Stay| End([End])
    
    PrevPost --> PostLoad
    NextPost --> PostLoad
    
    style HeroImage fill:#e1bee7
    style ReadContent fill:#fff9c4
    style ShareSection fill:#b2dfdb
    style NewsletterCTA fill:#ffccbc
```

---

## 5. Contact Page User Flow

```mermaid
graph TD
    ContactLand([User Lands on Contact Page]) --> ContactHero[Contact Page Hero]
    
    ContactHero --> ReadHeadline[Read: 'Let's Build Something Together']
    ReadHeadline --> ViewOptions{Choose Contact Method}
    
    ViewOptions --> |Prefer Form| ContactForm[Use Contact Form]
    ViewOptions --> |Direct Contact| AltMethods[View Alternative Methods]
    
    ContactForm --> FillName[Fill Name Field]
    FillName --> FillEmail[Fill Email Field]
    FillEmail --> SelectSubject[Select Subject/Topic]
    
    SelectSubject --> SubjectChoice{Choose Topic}
    SubjectChoice --> |General| TopicGeneral[General Inquiry]
    SubjectChoice --> |Collaboration| TopicCollab[Collaboration]
    SubjectChoice --> |Speaking| TopicSpeaking[Speaking Engagement]
    SubjectChoice --> |Consulting| TopicConsult[Consulting]
    
    TopicGeneral --> WriteMessage[Write Message]
    TopicCollab --> WriteMessage
    TopicSpeaking --> WriteMessage
    TopicConsult --> WriteMessage
    
    WriteMessage --> CharCount[View Character Count]
    CharCount --> ReviewForm{Form Complete?}
    
    ReviewForm --> |No| FillMissing[Complete Missing Fields]
    ReviewForm --> |Yes| SubmitForm[Click Submit Button]
    
    FillMissing --> ReviewForm
    
    SubmitForm --> LoadingState[Show Loading State]
    LoadingState --> ClientValidate{Client Validation}
    
    ClientValidate --> |Failed| ShowErrors[Show Validation Errors]
    ClientValidate --> |Passed| ServerSubmit[Submit to Server]
    
    ShowErrors --> ContactForm
    
    ServerSubmit --> SpamCheck{Spam Check}
    SpamCheck --> |Failed| SpamError[Show Error Message]
    SpamCheck --> |Passed| ServerProcess[Process Form]
    
    SpamError --> ContactForm
    
    ServerProcess --> SendEmail{Email Sent?}
    SendEmail --> |Success| SuccessAnim[Success Animation]
    SendEmail --> |Failed| ErrorMessage[Show Error Message]
    
    ErrorMessage --> ContactForm
    
    SuccessAnim --> ThankYou[Thank You Message]
    ThankYou --> ResponseTime[Show Expected Response Time]
    ResponseTime --> FormComplete[Form Completed]
    
    AltMethods --> ViewCards[View Contact Method Cards]
    ViewCards --> ChooseMethod{Choose Method}
    
    ChooseMethod --> |Email| CopyEmail[Click to Copy Email]
    ChooseMethod --> |LinkedIn| OpenLinkedIn[Open LinkedIn Profile]
    ChooseMethod --> |Twitter| OpenTwitter[Open Twitter Profile]
    ChooseMethod --> |GitHub| OpenGitHub[Open GitHub Profile]
    ChooseMethod --> |Calendar| OpenCalendly[Open Calendly Link]
    
    CopyEmail --> CopyConfirm[Email Copied Confirmation]
    CopyConfirm --> OpenExternal[Open Email Client]
    
    OpenLinkedIn --> ExternalSite[Visit External Site]
    OpenTwitter --> ExternalSite
    OpenGitHub --> ExternalSite
    OpenCalendly --> BookMeeting[Book Meeting Time]
    
    FormComplete --> CheckAvailability[View Availability Status]
    ExternalSite --> CheckAvailability
    BookMeeting --> CheckAvailability
    OpenExternal --> CheckAvailability
    
    CheckAvailability --> AvailBadge[See Status Badge]
    AvailBadge --> FAQ{View FAQ?}
    
    FAQ --> |Yes| ExpandAccordion[Expand FAQ Items]
    FAQ --> |No| EndContact([Exit Contact Page])
    
    ExpandAccordion --> ReadAnswer[Read Answers]
    ReadAnswer --> MoreQuestions{More Questions?}
    MoreQuestions --> |Yes| ExpandAccordion
    MoreQuestions --> |No| EndContact
    
    style ContactHero fill:#b2dfdb
    style ContactForm fill:#fff9c4
    style SuccessAnim fill:#c8e6c9
    style AltMethods fill:#e1bee7
```

---

## 6. Newsletter Signup Flow

```mermaid
graph TD
    Entry([Newsletter Signup Entry Point]) --> EntrySource{Source}
    
    EntrySource --> |Homepage CTA| HomepageForm[Homepage Newsletter Section]
    EntrySource --> |Blog Post End| BlogPostForm[End of Blog Post CTA]
    EntrySource --> |Footer| FooterForm[Footer Newsletter Widget]
    EntrySource --> |Dedicated Page| NewsletterPage[Newsletter Landing Page]
    
    HomepageForm --> ViewValue[Read Value Proposition]
    BlogPostForm --> ViewValue
    FooterForm --> ViewValue
    NewsletterPage --> DetailedInfo[View Detailed Info]
    
    DetailedInfo --> SampleTopics[See Sample Topics]
    SampleTopics --> Frequency[See Publishing Frequency]
    Frequency --> SocialProof[See Subscriber Count]
    SocialProof --> Archive[Browse Newsletter Archive]
    Archive --> ViewValue
    
    ViewValue --> DecideSignup{Sign Up?}
    
    DecideSignup --> |No| ExitFlow([Exit Flow])
    DecideSignup --> |Yes| EnterEmail[Enter Email Address]
    
    EnterEmail --> OptionalName{Provide Name?}
    OptionalName --> |Yes| EnterName[Enter Name]
    OptionalName --> |No| ReviewInput[Review Input]
    
    EnterName --> ReviewInput
    ReviewInput --> PrivacyLink[See Privacy Policy Link]
    PrivacyLink --> ClickSubmit[Click Subscribe Button]
    
    ClickSubmit --> FrontendValidate{Valid Format?}
    
    FrontendValidate --> |No| ShowValidationError[Show Validation Error]
    FrontendValidate --> |Yes| SubmitToService[Submit to Email Service]
    
    ShowValidationError --> EnterEmail
    
    SubmitToService --> ServiceCheck{Service Response}
    
    ServiceCheck --> |Error| ServiceError[Show Error Message]
    ServiceCheck --> |Already Subscribed| AlreadySub[Already Subscribed Message]
    ServiceCheck --> |Success| SendConfirmation[Send Confirmation Email]
    
    ServiceError --> TryAgain{Try Again?}
    TryAgain --> |Yes| EnterEmail
    TryAgain --> |No| ExitFlow
    
    AlreadySub --> ThankYouExisting[Thank You Message]
    ThankYouExisting --> ExitFlow
    
    SendConfirmation --> SuccessMessage[Show Success Message]
    SuccessMessage --> CheckInbox[Prompt: Check Your Inbox]
    CheckInbox --> UserEmail[User Opens Email]
    
    UserEmail --> ConfirmLink[Click Confirmation Link]
    ConfirmLink --> DoubleOptIn[Confirm Subscription]
    
    DoubleOptIn --> Confirmed[Subscription Confirmed]
    Confirmed --> WelcomeEmail[Receive Welcome Email]
    WelcomeEmail --> FirstNewsletter[Receive First Newsletter]
    FirstNewsletter --> OngoingEmails[Ongoing Newsletter Delivery]
    
    OngoingEmails --> ReadEmail{Read Newsletter?}
    ReadEmail --> |Yes| EngageContent[Engage with Content]
    ReadEmail --> |No| IgnoreEmail[Ignore Email]
    
    EngageContent --> ClickLinks[Click Article Links]
    ClickLinks --> VisitSite[Visit Portfolio Site]
    
    IgnoreEmail --> FutureNewsletter[Wait for Next Newsletter]
    FutureNewsletter --> ReadEmail
    
    VisitSite --> UnsubDecision{Want to Unsubscribe?}
    OngoingEmails --> UnsubDecision
    
    UnsubDecision --> |No| ContinueSub[Continue Subscription]
    UnsubDecision --> |Yes| ClickUnsub[Click Unsubscribe Link]
    
    ContinueSub --> OngoingEmails
    
    ClickUnsub --> UnsubPage[Unsubscribe Page]
    UnsubPage --> ConfirmUnsub{Confirm?}
    
    ConfirmUnsub --> |No| ContinueSub
    ConfirmUnsub --> |Yes| Unsubscribed[Unsubscribed Successfully]
    Unsubscribed --> GoodbyeMessage[Goodbye Message]
    GoodbyeMessage --> ExitFlow
    
    style ViewValue fill:#fff9c4
    style SubmitToService fill:#b2dfdb
    style Confirmed fill:#c8e6c9
    style OngoingEmails fill:#e1bee7
```

---

## 7. Mobile Navigation Flow

```mermaid
graph TD
    MobileUser([Mobile User Visits Site]) --> MobileView[Mobile Responsive View]
    
    MobileView --> SeeBurger[See Hamburger Menu Icon]
    SeeBurger --> TapMenu[Tap Hamburger Icon]
    
    TapMenu --> OpenDrawer[Glass Effect Drawer Opens]
    OpenDrawer --> ViewNav[View Navigation Options]
    
    ViewNav --> NavChoice{Select Destination}
    
    NavChoice --> |Home| TapHome[Tap Home]
    NavChoice --> |Writing| TapWriting[Tap Writing]
    NavChoice --> |Contact| TapContact[Tap Contact]
    NavChoice --> |Theme Toggle| TapTheme[Tap Theme Toggle]
    
    TapHome --> CloseDrawer[Drawer Closes]
    TapWriting --> CloseDrawer
    TapContact --> CloseDrawer
    
    CloseDrawer --> Navigate[Navigate to Page]
    Navigate --> MobileContent[View Mobile-Optimized Content]
    
    TapTheme --> ThemeSwitch[Switch Light/Dark Mode]
    ThemeSwitch --> ThemeAnim[Smooth Transition Animation]
    ThemeAnim --> UpdatedTheme[Updated Theme Applied]
    UpdatedTheme --> ViewNav
    
    MobileContent --> ScrollContent[Scroll Through Content]
    ScrollContent --> TouchInteraction{Touch Interaction}
    
    TouchInteraction --> |Tap Card| CardExpand[Card Expands/Navigates]
    TouchInteraction --> |Swipe| SwipeGesture[Swipe Gesture]
    TouchInteraction --> |Pinch| PinchZoom[Pinch to Zoom Image]
    
    CardExpand --> NewPage[Load New Page]
    SwipeGesture --> SwipeAction[Swipe Navigation]
    PinchZoom --> ZoomedView[Zoomed Image View]
    ZoomedView --> PinchOut[Pinch Out to Close]
    PinchOut --> MobileContent
    
    NewPage --> BackButton[See Back Button]
    BackButton --> TapBack[Tap Back]
    TapBack --> PreviousPage[Return to Previous Page]
    
    SwipeAction --> PreviousPage
    PreviousPage --> MobileContent
    
    MobileContent --> FloatingAction{Floating Actions?}
    FloatingAction --> |Back to Top| TapFloatTop[Tap Back to Top]
    FloatingAction --> |Share| TapShare[Tap Share Button]
    
    TapFloatTop --> SmoothScroll[Smooth Scroll to Top]
    SmoothScroll --> TopOfPage[Top of Page]
    
    TapShare --> NativeShare[Open Native Share Sheet]
    NativeShare --> ShareOptions[View Share Options]
    ShareOptions --> ShareComplete[Share Complete]
    
    TopOfPage --> MobileContent
    ShareComplete --> MobileContent
    
    style MobileView fill:#b2ebf2
    style OpenDrawer fill:#c5cae9
    style MobileContent fill:#fff9c4
```

---

## 8. Theme Toggle Flow

```mermaid
graph TD
    User([User on Site]) --> CurrentTheme{Current Theme}
    
    CurrentTheme --> |Light Mode| LightUI[Light Mode UI]
    CurrentTheme --> |Dark Mode| DarkUI[Dark Mode UI]
    CurrentTheme --> |System Default| DetectSystem[Detect System Preference]
    
    DetectSystem --> SystemCheck{System Setting}
    SystemCheck --> |Light| LightUI
    SystemCheck --> |Dark| DarkUI
    
    LightUI --> SeeToggle[See Theme Toggle Button]
    DarkUI --> SeeToggle
    
    SeeToggle --> ClickToggle[Click Theme Toggle]
    ClickToggle --> AnimationStart[Start Theme Transition]
    
    AnimationStart --> GlassTransition[Glass Effect Morphs]
    GlassTransition --> ColorShift[Colors Smoothly Shift]
    ColorShift --> BackgroundChange[Background Gradient Changes]
    BackgroundChange --> TextContrast[Text Contrast Adjusts]
    
    TextContrast --> ThemeApplied{New Theme}
    
    ThemeApplied --> |Now Light| NewLight[Light Theme Applied]
    ThemeApplied --> |Now Dark| NewDark[Dark Theme Applied]
    
    NewLight --> SavePreference[Save to localStorage]
    NewDark --> SavePreference
    
    SavePreference --> UpdateComponents[All Components Re-render]
    UpdateComponents --> AnimationComplete[Transition Complete]
    
    AnimationComplete --> ContinueBrowsing[User Continues Browsing]
    ContinueBrowsing --> PersistPreference{Leave and Return?}
    
    PersistPreference --> |Yes| ReturnVisit[User Returns to Site]
    PersistPreference --> |No| StaySite[Stay on Site]
    
    ReturnVisit --> LoadPreference[Load Saved Preference]
    LoadPreference --> ApplySaved[Apply Saved Theme]
    ApplySaved --> PreferredTheme[Preferred Theme Active]
    
    StaySite --> SeeToggle
    PreferredTheme --> SeeToggle
    
    style LightUI fill:#fff9c4
    style DarkUI fill:#b39ddb
    style GlassTransition fill:#b2dfdb
    style SavePreference fill:#c8e6c9
```

---

## 9. Search & Filter Flow (Blog)

```mermaid
graph TD
    BlogPage([User on Blog Page]) --> SeeSearch[See Search & Filter Options]
    
    SeeSearch --> UserIntent{User Intent}
    
    UserIntent --> |Know Topic| UseSearch[Use Search Bar]
    UserIntent --> |Browse Category| UseCategory[Use Category Filter]
    UserIntent --> |Find by Tag| UseTag[Use Tag Filter]
    UserIntent --> |Change Order| UseSort[Use Sort Options]
    
    UseSearch --> ClickSearch[Click Search Bar]
    ClickSearch --> TypeQuery[Start Typing Query]
    TypeQuery --> LiveUpdate[Results Update Live]
    
    LiveUpdate --> ResultsFilter{Results Found?}
    ResultsFilter --> |Yes| ShowResults[Show Filtered Posts]
    ResultsFilter --> |No| NoResults[No Results Message]
    
    NoResults --> Suggestions[Show Search Suggestions]
    Suggestions --> TryAgain{Try Different Query?}
    TryAgain --> |Yes| TypeQuery
    TryAgain --> |No| ClearSearch[Clear Search]
    ClearSearch --> AllPosts[Show All Posts]
    
    UseCategory --> ViewCategories[View Category Chips]
    ViewCategories --> SelectCat{Select Category}
    
    SelectCat --> |Product Management| FilterPM[Filter PM Posts]
    SelectCat --> |Engineering| FilterEng[Filter Engineering Posts]
    SelectCat --> |Lessons| FilterLessons[Filter Lessons Posts]
    SelectCat --> |Stories| FilterStories[Filter Stories Posts]
    SelectCat --> |Projects| FilterProjects[Filter Project Posts]
    
    FilterPM --> ShowResults
    FilterEng --> ShowResults
    FilterLessons --> ShowResults
    FilterStories --> ShowResults
    FilterProjects --> ShowResults
    
    UseTag --> ViewTagCloud[View Tag Cloud]
    ViewTagCloud --> ClickTag[Click Tag]
    ClickTag --> TagFilter[Filter by Tag]
    TagFilter --> ShowResults
    
    UseSort --> SortMenu[Open Sort Menu]
    SortMenu --> ChooseSort{Choose Sort Order}
    
    ChooseSort --> |Latest| SortLatest[Sort by Latest First]
    ChooseSort --> |Oldest| SortOldest[Sort by Oldest First]
    ChooseSort --> |Popular| SortPopular[Sort by Most Popular]
    
    SortLatest --> ReorderResults[Reorder Results]
    SortOldest --> ReorderResults
    SortPopular --> ReorderResults
    
    ReorderResults --> ShowResults
    
    ShowResults --> ResultCount[Show Results Count]
    ResultCount --> ViewPosts[View Filtered Posts]
    
    ViewPosts --> MultiFilter{Add Another Filter?}
    MultiFilter --> |Yes Search| AddSearch[Combine with Search]
    MultiFilter --> |Yes Category| AddCategory[Combine with Category]
    MultiFilter --> |No| BrowseResults[Browse Results]
    
    AddSearch --> CombinedFilter[Combined Filters Active]
    AddCategory --> CombinedFilter
    CombinedFilter --> RefineResults[Refined Results]
    RefineResults --> ShowResults
    
    BrowseResults --> ClickPost[Click on Post]
    ClickPost --> ReadPost[Read Full Post]
    
    AllPosts --> ViewPosts
    
    ViewPosts --> ClearFilters{Clear Filters?}
    ClearFilters --> |Yes| ResetAll[Reset All Filters]
    ClearFilters --> |No| BrowseResults
    
    ResetAll --> AllPosts
    
    style UseSearch fill:#fff9c4
    style UseCategory fill:#b2dfdb
    style ShowResults fill:#c8e6c9
    style CombinedFilter fill:#e1bee7
```

---

## 10. Content Engagement Flow

```mermaid
graph TD
    Visitor([Site Visitor]) --> FirstVisit{First Time Visitor?}
    
    FirstVisit --> |Yes| NewVisitor[New Visitor Experience]
    FirstVisit --> |No| ReturningVisitor[Returning Visitor]
    
    NewVisitor --> ExploreHome[Explore Homepage]
    ExploreHome --> LearnAbout[Learn About Owner]
    LearnAbout --> ViewWork[View Featured Work]
    ViewWork --> Impressed{Impressed?}
    
    Impressed --> |Yes| DeepDive[Deep Dive Content]
    Impressed --> |No| QuickExit[Leave Site]
    
    DeepDive --> ReadBlog[Read Blog Post]
    ReadBlog --> EngagedReading[Engaged Reading]
    EngagedReading --> FinishPost[Finish Post]
    
    FinishPost --> ValueReceived{Found Value?}
    ValueReceived --> |Yes| WantMore[Want More Content]
    ValueReceived --> |No| LeaveSite[Leave Site]
    
    WantMore --> NewsletterPrompt[See Newsletter Signup]
    NewsletterPrompt --> SignupDecision{Sign Up?}
    
    SignupDecision --> |Yes| Subscribe[Subscribe to Newsletter]
    SignupDecision --> |No| Bookmark[Bookmark Site]
    
    Subscribe --> EmailSubscriber[Becomes Email Subscriber]
    EmailSubscriber --> ReceiveEmails[Receive Regular Emails]
    ReceiveEmails --> EmailEngagement{Engage with Emails?}
    
    EmailEngagement --> |Yes| ReturnVisits[Regular Return Visits]
    EmailEngagement --> |No| Unsubscribe[Unsubscribe]
    
    Bookmark --> OccasionalVisit[Occasional Return Visit]
    
    ReturningVisitor --> DirectNav{Where to Go?}
    DirectNav --> |Check New Posts| BlogFirst[Go to Blog]
    DirectNav --> |Specific Topic| SearchContent[Search for Topic]
    DirectNav --> |General Browse| HomeAgain[Visit Homepage]
    
    BlogFirst --> NewContent{New Content?}
    NewContent --> |Yes| ReadNew[Read New Posts]
    NewContent --> |No| ArchiveDive[Explore Archive]
    
    ReadNew --> EngagedReading
    ArchiveDive --> EngagedReading
    
    SearchContent --> FindPost[Find Relevant Post]
    FindPost --> EngagedReading
    
    ReturnVisits --> LoyalReader[Becomes Loyal Reader]
    OccasionalVisit --> LoyalReader
    
    LoyalReader --> Advocate{Become Advocate?}
    Advocate --> |Yes| ShareContent[Share Content]
    Advocate --> |No| SilentReader[Silent Reader]
    
    ShareContent --> SocialShare[Share on Social Media]
    SocialShare --> BringOthers[Bring New Visitors]
    BringOthers --> NewVisitor
    
    SilentReader --> ContinueReading[Continue Reading]
    ContinueReading --> ReturnVisits
    
    LoyalReader --> ContactOwner{Reach Out?}
    ContactOwner --> |Yes| UseContact[Use Contact Form]
    ContactOwner --> |No| ContinueReading
    
    UseContact --> SendMessage[Send Message]
    SendMessage --> StartRelationship[Start Professional Relationship]
    
    StartRelationship --> Collaboration[Potential Collaboration]
    StartRelationship --> Consulting[Consulting Opportunity]
    StartRelationship --> Speaking[Speaking Engagement]
    StartRelationship --> NetworkingNode[Networking Connection]
    
    style NewVisitor fill:#fff9c4
    style Subscribe fill:#c8e6c9
    style LoyalReader fill:#b2dfdb
    style StartRelationship fill:#ffccbc
```

---

## Flow Diagram Summary

These user flows cover:

1. **Overall Site Navigation** - High-level navigation between pages
2. **Homepage Journey** - Detailed flow through homepage sections
3. **Blog/Writing Page** - Browsing and filtering blog content
4. **Individual Blog Post** - Reading experience and interactions
5. **Contact Page** - Form submission and alternative contact methods
6. **Newsletter Signup** - Complete subscription funnel
7. **Mobile Navigation** - Touch-optimized mobile experience
8. **Theme Toggle** - Light/dark mode switching
9. **Search & Filter** - Content discovery mechanisms
10. **Content Engagement** - Visitor-to-advocate journey

Each flow follows the features outlined in the feature specification and visualizes user decision points, interactions, and outcomes using Mermaid syntax.
