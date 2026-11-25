import { ImageDown } from "lucide-react";
import type { Faq } from "./faqs";
import type { Tool, ToolSection } from "./tools";

// New tools and long-form page content live here so tools.ts stays easy to read.
// tools.ts merges both exports into TOOLS.

const common: Faq[] = [
  { q: "Is this tool free?", a: "Yes. The tool is free to use and does not require an account." },
  { q: "Are my images uploaded?", a: "Image processing is performed in your browser. The image file is not sent to ImgSimplify's image-processing server." },
];

const sizeNote: Faq = {
  q: "Why is my file a little under the target size?",
  a: "ImgSimplify counts 1 KB as 1,000 bytes and keeps the file at or below that limit, so it also passes forms that count in 1,000s instead of 1,024s. Your file manager may show a slightly smaller number than the target.",
};

export const EXTRA_TOOLS: Tool[] = [
  {
    slug: "compress-image-to-20kb",
    title: "Compress Image to 20KB",
    description: "Reduce an image to under 20KB.",
    mode: "compress",
    targetKb: 20,
    icon: ImageDown,
    color: "bg-teal-500/10 text-teal-500",
    intro: "Compress a JPG, PNG or WebP image to 20KB or less. Type your target size, check the preview and download the result without uploading your photo.",
    seoTitle: "Compress Image to 20KB Online Free",
    metaDescription: "Compress an image to 20KB or less online for free. Enter your target size, preview the result and download a JPG in your browser with no upload.",
    howTo: [
      "Upload your JPG, PNG, WebP, GIF or AVIF image.",
      "Leave the target at 20 KB, or type a different size.",
      "Wait a moment while ImgSimplify finds the best quality that fits.",
      "Check the preview and the size note, then download the compressed image.",
    ],
    bestFor: "Signatures, small ID-style photos and thumbnails for forms that set a very small upload limit.",
    tips: [
      "Resize a very large photo first with the Resize Image tool. A smaller starting size keeps more detail at 20KB.",
      "Choose JPG for photos and scans. It usually gives the smallest file and is accepted almost everywhere.",
      "For signatures, use a plain white background and dark ink. Simple images compress far better than detailed ones.",
      "Always check the exact limit and accepted formats on the form you are uploading to.",
    ],
    faqs: [
      { q: "Can every image be compressed to 20KB?", a: "Most can, but 20KB is a very small file. Large or very detailed photos may need smaller dimensions as well as lower quality. If the tool cannot reach the target, it tells you and gives you the smallest result it could make." },
      { q: "Will my image get smaller in pixels?", a: "Only when lowering the quality is not enough. The tool first tries a range of quality levels and reduces the dimensions only if the file is still above your target. The final dimensions are shown next to the file size." },
      { q: "Which format should I choose?", a: "JPG is the safest choice for forms and usually produces the smallest file for photos. WebP can be smaller still, but some upload forms do not accept it." },
      sizeNote,
      ...common,
    ],
  },
  {
    slug: "compress-image-to-50kb",
    title: "Compress Image to 50KB",
    description: "Reduce an image to under 50KB.",
    mode: "compress",
    targetKb: 50,
    icon: ImageDown,
    color: "bg-cyan-500/10 text-cyan-500",
    intro: "Reduce a photo to 50KB or less for forms, profiles and applications. Choose the size, preview the quality and download it right in your browser.",
    seoTitle: "Compress Image to 50KB Online Free",
    metaDescription: "Compress an image to 50KB or less online for free. Set your target size, compare the preview and download the file without uploading your image.",
    howTo: [
      "Upload your JPG, PNG, WebP, GIF or AVIF image.",
      "Keep the target at 50 KB, or change it to the size your form asks for.",
      "Wait while ImgSimplify finds the highest quality that stays under the limit.",
      "Check the preview and the size note, then download the result.",
    ],
    bestFor: "Passport-style photos, profile pictures, and job or admission form uploads that ask for a file under 50KB.",
    tips: [
      "Crop the photo to the subject first. Fewer pixels of background means more quality left for the face.",
      "Use even lighting when you take the photo. Grainy, noisy photos compress worse than clean ones.",
      "If the form also requires exact pixel dimensions, resize first, then compress.",
      "Keep your original file in case you need a higher quality version later.",
    ],
    faqs: [
      { q: "How do I compress an image to 50KB?", a: "Upload the image, leave the target at 50 KB and download the result. The tool tests different JPG quality levels and keeps the highest one that fits under the limit." },
      { q: "Will a 50KB photo look blurry?", a: "A 50KB file holds less detail than a full-size photo, but a well-lit, cropped portrait usually stays clear enough for forms. Fine text in scanned documents may blur, so use a larger target such as 100KB or 200KB for those." },
      { q: "What if my image is already under 50KB?", a: "The tool tells you that your original is already under the target. You can keep the original file." },
      sizeNote,
      ...common,
    ],
  },
  {
    slug: "compress-image-to-100kb",
    title: "Compress Image to 100KB",
    description: "Reduce an image to under 100KB.",
    mode: "compress",
    targetKb: 100,
    icon: ImageDown,
    color: "bg-indigo-500/10 text-indigo-500",
    intro: "Shrink an image to 100KB or less while keeping it readable. Pick the size, preview the result and save it without uploading anything.",
    seoTitle: "Compress Image to 100KB Online Free",
    metaDescription: "Compress an image to 100KB or less online for free. Enter your target size, preview the quality and download the file directly from your browser.",
    howTo: [
      "Upload your JPG, PNG, WebP, GIF or AVIF image.",
      "Leave the target at 100 KB, or type the limit your upload form shows.",
      "Wait while ImgSimplify searches for the best quality that fits.",
      "Check the preview and size note, then download the compressed file.",
    ],
    bestFor: "Scanned documents, certificates, larger ID photos, website thumbnails and email attachments.",
    tips: [
      "For scanned documents, scanning at a moderate resolution is often enough for readable text and keeps files small.",
      "Choose WebP for your own website to get smaller files. Choose JPG when a form or app must accept the file.",
      "If the text in a scan looks soft, try a slightly larger target instead of lowering quality further.",
      "A PNG screenshot is exported as JPG or WebP here, so transparent areas become white in JPG.",
    ],
    faqs: [
      { q: "How do I reduce an image to 100KB?", a: "Upload the image, keep the target at 100 KB and download the result. ImgSimplify tries several quality levels and picks the highest one that stays under the limit." },
      { q: "Why does my file not shrink much?", a: "Very large photos carry a lot of pixels. If quality reduction alone is not enough, the tool also reduces the dimensions. You can resize first with the Resize Image tool for more control." },
      { q: "Is 100KB enough for a document scan?", a: "Often yes for a single page at a moderate resolution, but dense small text may need a larger target. Preview the result and zoom in before you upload it." },
      sizeNote,
      ...common,
    ],
  },
  {
    slug: "compress-image-to-200kb",
    title: "Compress Image to 200KB",
    description: "Reduce an image to under 200KB.",
    mode: "compress",
    targetKb: 200,
    icon: ImageDown,
    color: "bg-violet-500/10 text-violet-500",
    intro: "Compress a photo to 200KB or less and keep it sharp. Set the target, compare the preview and download it in seconds, all inside your browser.",
    seoTitle: "Compress Image to 200KB Online Free",
    metaDescription: "Compress an image to 200KB or less online for free. Choose your target size, preview the result and download it without uploading your photo.",
    howTo: [
      "Upload your JPG, PNG, WebP, GIF or AVIF image.",
      "Keep the target at 200 KB, or change it to the limit you need.",
      "Wait while ImgSimplify finds the best quality that fits.",
      "Check the preview and size note, then download the result.",
    ],
    bestFor: "Blog images, product photos, social uploads and email-friendly pictures that should stay sharp.",
    tips: [
      "Resize to the largest size you will actually display before compressing. This usually saves more than quality changes alone.",
      "Use WebP for your own website and JPG for forms, email and older software.",
      "Photos with smooth gradients, such as skies, show compression more than busy photos. Preview before you download.",
      "Keep an uncompressed master copy of important photos.",
    ],
    faqs: [
      { q: "How do I compress an image to 200KB?", a: "Upload the image, keep the target at 200 KB and download the result. The tool finds the highest quality that fits under the limit." },
      { q: "Is 200KB good for a website image?", a: "It is a reasonable budget for many blog and product images, especially when the dimensions match how large the image is shown on the page. Hero images may need more, and small icons far less." },
      { q: "Should I choose JPG or WebP?", a: "WebP often gives a smaller file at similar quality and works in current browsers. JPG is the safer choice when the file must open in older apps or upload forms." },
      sizeNote,
      ...common,
    ],
  },
];

export const TOOL_SECTIONS: Record<string, ToolSection[]> = {
  "compress-image-to-20kb": [
    {
      heading: "How to compress an image to 20KB",
      paragraphs: [
        "A 20KB limit means the finished file must be no larger than about 20 kilobytes, roughly the size of a short text document. ImgSimplify tries a range of JPG quality levels and keeps the highest one that fits under your target. If the file is still too large at a reasonable quality, it reduces the image dimensions step by step and tries again.",
        "Everything runs in your browser, so your photo or signature is never sent to a server. You can change the target size at any time and the preview updates automatically.",
      ],
    },
    {
      heading: "Where very small upload limits show up",
      paragraphs: [
        "Limits as small as 20KB often appear on form-based portals, application systems and profile fields that store thousands of uploads. The exact limit and the accepted formats differ from site to site, so read the instructions next to the upload button before you start.",
        "If a form asks for both a file size and exact pixel dimensions, resize the image first with the Resize Image tool, then compress it here.",
      ],
    },
    {
      heading: "Tips for a clear 20KB image",
      paragraphs: [
        "Signatures and handwriting compress very well because they use few colors. Write on plain white paper with dark ink, photograph or scan it in good light, crop tightly and the result usually stays crisp even at 20KB.",
        "Photos of people hold much more detail. At 20KB expect a smaller, softer image, so crop to the face and shoulders and avoid busy backgrounds to spend your limited bytes on what matters.",
      ],
    },
    {
      heading: "Check the result before you upload",
      paragraphs: [
        "Open the downloaded file and confirm it looks right at full size. Keep your original file as well, in case the form rejects the result or you need a larger version for another purpose.",
      ],
    },
  ],
  "compress-image-to-50kb": [
    {
      heading: "How to compress an image to 50KB",
      paragraphs: [
        "Upload your image and leave the target at 50 KB. ImgSimplify tests different quality levels and keeps the highest one that stays at or under the limit. When quality alone cannot get the file small enough, it also reduces the dimensions a little and tries again, then shows you the final size and dimensions.",
        "Because the work happens inside your browser, your photo is never uploaded anywhere.",
      ],
    },
    {
      heading: "Why 50KB limits exist",
      paragraphs: [
        "Websites that collect thousands of photos, such as application portals and membership systems, often set small limits to save storage and keep pages fast. A 50KB limit is common for portrait photos and profile pictures, although every site sets its own rules.",
      ],
    },
    {
      heading: "How to keep a face photo sharp at 50KB",
      paragraphs: [
        "Crop to the face and shoulders before compressing, so the file size is spent on the subject instead of the background. Even lighting also helps, because grain and noise are expensive to compress.",
        "If the form asks for exact pixel dimensions, resize first with the Resize Image tool and compress afterward. Doing it in that order gives the best quality for the size.",
      ],
    },
    {
      heading: "When 50KB is too small",
      paragraphs: [
        "Scanned pages and certificates with small printed text can look blurry at 50KB. For documents, try the 100KB or 200KB size instead, and zoom in on the preview to check that the text is still readable.",
      ],
    },
  ],
  "compress-image-to-100kb": [
    {
      heading: "How to compress an image to 100KB",
      paragraphs: [
        "Drop in your image, keep the target at 100 KB and wait a moment. ImgSimplify searches for the highest quality that fits under the limit and shows the new file size next to the original so you can see exactly how much was saved.",
        "You can type a different target at any time if your form asks for a different limit.",
      ],
    },
    {
      heading: "Using 100KB for scans and documents",
      paragraphs: [
        "A single scanned page often stays readable at 100KB when it is scanned at a moderate resolution. Very small or dense text may need a little more room, so zoom in on the preview before you upload the file.",
        "If the text looks soft, increase the target slightly rather than forcing a smaller size. A readable document is more useful than a tiny one.",
      ],
    },
    {
      heading: "100KB images for websites",
      paragraphs: [
        "Smaller images help pages load faster. For your own site, choose WebP as the output format, which is often smaller than JPG at similar quality. For uploads to forms, email and older software, JPG is the safer choice.",
      ],
    },
    {
      heading: "If the file will not get much smaller",
      paragraphs: [
        "Photos that are already heavily compressed, or very large photos with lots of fine detail, are hard to shrink by quality alone. Reducing the pixel dimensions removes far more data, which ImgSimplify does automatically when needed, or you can do it yourself first with the Resize Image tool.",
      ],
    },
  ],
  "compress-image-to-200kb": [
    {
      heading: "How to compress an image to 200KB",
      paragraphs: [
        "Upload the image and keep the target at 200 KB. ImgSimplify finds the highest quality that stays under the limit, so you keep as much detail as the size allows. Download the result when the preview looks good.",
        "Your image is processed inside your browser and is never uploaded to a server.",
      ],
    },
    {
      heading: "A sensible budget for web images",
      paragraphs: [
        "200KB is a reasonable target for many blog and product images, particularly when the pixel dimensions match how large the image appears on the page. Resizing to the displayed size before compressing usually saves more than lowering quality does.",
      ],
    },
    {
      heading: "JPG or WebP at 200KB?",
      paragraphs: [
        "WebP often produces a smaller file at similar quality and works in current browsers, which makes it a good choice for your own website. JPG is better when the image needs to open in older apps, email programs or upload forms.",
      ],
    },
    {
      heading: "Photos that need extra care",
      paragraphs: [
        "Smooth areas such as skies and studio backgrounds show compression artifacts more easily than busy scenes. If you see banding or blocks in the preview, raise the target size a little or resize the image first so the same budget covers fewer pixels.",
      ],
    },
  ],
  "compress-image": [
    {
      heading: "How image compression works",
      paragraphs: [
        "Photos are usually compressed with lossy methods, which discard detail that is hard to notice. Lowering the quality slider shrinks the file, and for most photos a setting between 75% and 85% keeps the image looking the same while saving a large share of the size.",
        "In this tool, JPG and WebP outputs use the quality slider. PNG files are exported as WebP or JPG when you compress them. WebP keeps transparency, while JPG fills transparent areas with white.",
      ],
    },
    {
      heading: "JPG or WebP: which should you pick?",
      paragraphs: [
        "WebP is often smaller than JPG at similar quality, and current browsers support it. JPG is the safer choice when you need to send the file to older software, print services or upload forms. Auto mode keeps JPG files as JPG and exports other formats as WebP.",
      ],
    },
    {
      heading: "Need an exact file size?",
      paragraphs: [
        "If a form or app asks for a specific limit, use one of the target-size tools below. You enter the size, and ImgSimplify finds the highest quality that stays under it.",
      ],
    },
  ],
  "resize-image": [
    {
      heading: "How to resize an image without stretching it",
      paragraphs: [
        "Keep the aspect ratio lock turned on and change either the width or the height. The other value is calculated for you, so the picture keeps its proportions. Turn the lock off only when you want to set an exact width and height, which stretches the image if the ratio differs.",
      ],
    },
    {
      heading: "Common image sizes",
      paragraphs: [
        "Square social posts are often 1080 by 1080 pixels, full HD video frames are 1920 by 1080, video thumbnails are commonly 1280 by 720 and link preview images are often 1200 by 630. Check the platform you are uploading to, because recommended sizes change over time.",
      ],
    },
    {
      heading: "Resize first, then compress",
      paragraphs: [
        "Reducing the pixel dimensions removes much more data than compression alone. Resize to the largest size you will actually display, then use the Compress Image tool to reduce the file size further.",
      ],
    },
  ],
  "avif-to-jpg": [
    {
      heading: "What is AVIF, and why will it not open?",
      paragraphs: [
        "AVIF is a modern image format that produces very small files at good quality. Current versions of Chrome, Edge, Firefox and Safari can open it, but many photo editors, email programs, print services and upload forms still cannot. Converting to JPG makes the picture work almost everywhere.",
      ],
    },
    {
      heading: "How to convert AVIF to JPG",
      paragraphs: [
        "Upload your AVIF file, choose the JPG quality and download the converted image. The conversion runs in your browser, so the file is not uploaded. Your browser has to be able to open AVIF for the file to load, which current versions can.",
      ],
    },
    {
      heading: "What changes when you convert",
      paragraphs: [
        "JPG does not support transparency, so transparent areas turn white. The JPG is usually larger than the AVIF because AVIF compresses very efficiently, so lower the quality slider if you need a smaller file. Keep the original AVIF if you may want the smaller size later.",
      ],
    },
  ],
  "webp-to-jpg": [
    {
      heading: "Why you might need to convert WebP to JPG",
      paragraphs: [
        "Images saved from websites are often WebP files. Browsers handle them well, but older editors, some print services and many upload forms only accept JPG or PNG. Converting to JPG is the quickest way to get a file that opens everywhere.",
      ],
    },
    {
      heading: "What happens to transparency and quality",
      paragraphs: [
        "JPG cannot store transparency, so transparent areas become white. Converting also re-compresses the picture, so choose a higher quality setting if sharpness matters. The JPG may be somewhat larger than the WebP, and you can lower the quality slider to reduce it.",
      ],
    },
  ],
  "jpg-to-webp": [
    {
      heading: "Why convert JPG to WebP",
      paragraphs: [
        "WebP files are often noticeably smaller than JPG files at similar quality, which helps web pages load faster. Current browsers support WebP, so it is a good default format for images on your own site.",
      ],
    },
    {
      heading: "When to keep JPG instead",
      paragraphs: [
        "Keep JPG when the image has to open in older software, print services or upload forms that do not accept WebP. If you need to share a file widely, JPG is still the most compatible choice.",
      ],
    },
    {
      heading: "Choosing a quality setting",
      paragraphs: [
        "A quality between 75% and 85% works well for most photos. Preview the result and compare the file sizes before you download. If your browser cannot export WebP, the tool will tell you so you can try another browser.",
      ],
    },
  ],
};
