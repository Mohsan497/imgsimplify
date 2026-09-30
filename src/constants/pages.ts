export interface StaticPageContent {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  /** SEO title for <title>. The site template adds " | ImgSimplify" automatically. */
  metaTitle?: string;
  /** SEO meta description (aim for 140-160 characters). */
  description?: string;
  /** Shown on legal pages, e.g. "September 28, 2026". */
  updated?: string;
}

export const ABOUT_PAGE: StaticPageContent = {
  title: "About ImgSimplify",
  metaTitle: "About Us – Free & Browser-Based Online Image Tools",
  description:
    "ImgSimplify offers free browser-based image tools to compress, resize, convert and crop images. No image-processing upload and no signup required.",
  intro:
    "ImgSimplify is a free set of online image tools to compress, resize, convert and crop photos, and every one of them runs inside your browser. Your images are never uploaded anywhere.",
  sections: [
    {
      heading: "Why we built ImgSimplify",
      body: "Most online image compressors and converters ask you to upload your files to a server. You rarely know where those files go or how long they stay there. Modern browsers are powerful enough to do the whole job locally, so we built ImgSimplify: simple image tools that never send your photos anywhere.",
    },
    {
      heading: "Free online image tools, all in one place",
      body: "Compress images to reduce file size, resize photos to exact pixel dimensions, convert between JPG, PNG and WebP, crop to popular aspect ratios like 1:1, 4:3 and 16:9, and turn any image into a Base64 string (or back into an image file). There is nothing to install and no account to create, and every tool works on desktop and mobile.",
    },
    {
      heading: "How ImgSimplify works",
      body: "ImgSimplify uses the Canvas API that is already built into your browser. When you choose an image, it is loaded into your device's memory, processed there and handed back to you for download. Nothing is sent to our servers, so there is no upload wait and no copy of your file left behind.",
    },
    {
      heading: "Private by design",
      body: "There are no accounts and no image-processing uploads. Because the image transformations happen on your device, ImgSimplify does not receive or store the image files processed by the tools. You can read exactly what we do and do not collect on our Privacy Policy page.",
    },
    {
      heading: "What makes ImgSimplify different",
      body: "Many image compressors and converters process your files on their servers. ImgSimplify does not. That means no waiting for uploads, no server-side file size limits, no data retention and no risk of a third party accessing your pictures. It is fast, private image processing that works the way it should.",
    },
    {
      heading: "Free to use",
      body: "ImgSimplify is free to use, with no signup, no watermarks and no paywalled tool features. The site may be supported by advertising, while the image-processing tools remain available without an account.",
    },
    {
      heading: "Built with modern web technology",
      body: "ImgSimplify is built with Next.js, TypeScript and Tailwind CSS, and it relies on browser APIs such as Canvas for image processing. The only job our servers have is delivering the website itself. Your images never touch them.",
    },
    {
      heading: "Get in touch",
      body: "Found a bug, have an idea for a new image tool, or just want to say hi? We would love to hear from you. Email us at hello@ImgSimplify.com.",
    },
  ],
};

export const PRIVACY_PAGE: StaticPageContent = {
  title: "Privacy Policy",
  metaTitle: "Privacy Policy – ImgSimplify",
  description:
    "Learn how ImgSimplify handles image files, website data, advertising and consent. Image processing happens locally in your browser.",
  updated: "September 29, 2026",
  intro:
    "ImgSimplify is designed so that the image-processing tools work locally in your browser. This policy explains what happens to your images and what website data may be involved.",
  sections: [
    {
      heading: "Image files",
      body: "When you use ImgSimplify's image tools, the selected image is processed locally in your browser. The image file is not uploaded to an ImgSimplify image-processing server, stored in an ImgSimplify account, or retained by us after processing.",
    },
    {
      heading: "Information we may receive",
      body: "ImgSimplify does not require an account. Our hosting provider may process standard technical request data such as an IP address, browser information and requested page for security, reliability and abuse prevention. If you contact us by email, we will receive the information you choose to include in that message.",
    },
    {
      heading: "Advertising",
      body: "ImgSimplify may display advertising from third-party providers such as Google AdSense or Adsterra. These providers may use cookies, local storage, device identifiers and similar technologies to serve, limit and measure ads and, where permitted, to personalize them. Google, as a third-party vendor, uses cookies to serve ads based on a user's prior visits to this and other websites. You can opt out of personalized advertising from Google at adssettings.google.com, and learn about opt-out choices for many other providers at www.aboutads.info or www.youronlinechoices.eu. Ads never receive or see the images you process in the tools, because that processing happens only in your browser.",
    },
    {
      heading: "Consent for advertising",
      body: "Where advertising consent is legally required, ImgSimplify will provide an appropriate consent mechanism. For Google personalized advertising to users in the European Economic Area, the United Kingdom and Switzerland, Google requires publishers to use a Google-certified consent management platform integrated with the IAB Transparency and Consent Framework. Users can make choices through the consent interface where available.",
    },
    {
      heading: "Cookies and local storage",
      body: "The site may use local storage for preferences such as the selected theme. Advertising providers may also use cookies or local storage when advertising is enabled, subject to applicable consent requirements and the choices made by the user.",
    },
    {
      heading: "Analytics",
      body: "ImgSimplify does not currently require analytics for the image-processing tools. If analytics are added, this policy will be updated to describe the provider, the information collected and the available choices.",
    },
    {
      heading: "Third-party services",
      body: "Third-party services may be used for hosting, advertising, consent management or other site functionality. These services process information according to their own policies and the configuration used by ImgSimplify. The image-processing tools themselves are designed to keep image files in the browser.",
    },
    {
      heading: "Children",
      body: "ImgSimplify is not directed at children and does not require accounts. Advertising and consent settings may impose additional requirements depending on the user's age, location and the advertising providers enabled on the site.",
    },
    {
      heading: "Changes to this policy",
      body: "We may update this Privacy Policy when the site, advertising providers or data practices change. The last updated date at the top of this page shows when the current version was published.",
    },
    {
      heading: "Contact",
      body: "For privacy questions, email mohsantahir497@gmail.com Do not send private images or other sensitive information unless it is necessary for your request.",
    },
  ],
};

export const TERMS_PAGE: StaticPageContent = {
  title: "Terms of Service",
  metaTitle: "Terms of Service – Free Online Image Tools",
  description:
    "Read the ImgSimplify terms of service: free browser-based image tools for personal and commercial use, no signup, with images processed on your device.",
  updated: "September 28, 2026",
  intro:
    "By using ImgSimplify, you agree to these simple terms. They are short on purpose, because the tools run in your browser and we never handle your files.",
  sections: [
    {
      heading: "Acceptance of terms",
      body: "By accessing or using ImgSimplify, you agree to be bound by these Terms of Service. If you do not agree with any part of them, please do not use the service.",
    },
    {
      heading: "Use of the service",
      body: "ImgSimplify provides free, browser-based image tools for personal and commercial use, including compressing, resizing, converting and cropping images. All processing happens locally on your device. You agree to use the service lawfully and only with images that you have the right to edit, modify or distribute.",
    },
    {
      heading: "Your content",
      body: "You keep full ownership of every image and file you process with ImgSimplify. Because processing happens in your browser, we never receive, store or claim any rights over your content.",
    },
    {
      heading: "Results and file quality",
      body: "Compression and format conversion can change how an image looks, for example when saving to JPG or WebP at a lower quality. Always review the result before using it, and keep a copy of your original files.",
    },
    {
      heading: "No warranty",
      body: "ImgSimplify is provided \"as is\" and \"as available\", without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted or error-free, or that the results will meet your expectations.",
    },
    {
      heading: "Limitation of liability",
      body: "To the fullest extent permitted by law, ImgSimplify and its creators are not liable for any direct, indirect, incidental or consequential damages arising from the use of, or inability to use, the service. This includes loss of data, loss of profits or damage to files. Always keep a backup of your original images before processing them.",
    },
    {
      heading: "Intellectual property",
      body: "The ImgSimplify name, logo, website design and underlying code are the intellectual property of ImgSimplify. You may not copy, modify or redistribute the service without permission.",
    },
    {
      heading: "Third-party links",
      body: "ImgSimplify may contain links to third-party websites or services. We are not responsible for the content, privacy practices or terms of those external sites.",
    },
    {
      heading: "Changes to these terms",
      body: "We may update these Terms of Service from time to time. Continued use of ImgSimplify after changes are posted means you accept the updated terms. The \"last updated\" date on this page shows when the terms last changed.",
    },
    {
      heading: "Governing law",
      body: "These terms are governed by the laws of the jurisdiction in which ImgSimplify operates, without regard to conflict of law principles.",
    },
    {
      heading: "Contact",
      body: "If you have questions about these Terms of Service, email us at mohsantahir497@gmail.com.",
    },
  ],
};

export const BLOG_PAGE: StaticPageContent = {
  title: "Blog",
  metaTitle: "Image Optimization Guides & Tips",
  description:
    "Guides on compressing images, choosing between JPG, PNG and WebP, and making your website faster. New ImgSimplify articles are coming soon.",
  intro:
    "Practical guides on image compression, JPG vs PNG vs WebP, and web performance are on the way.",
  sections: [
    {
      heading: "Coming soon",
      body: "We are writing our first articles now. In the meantime, try the free tools to compress, resize and convert your images privately in your browser.",
    },
  ],
};