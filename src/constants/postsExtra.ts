import type { Post, PostBlock } from "./posts";

// New articles. posts.ts merges these in and sorts everything newest first.
export const NEW_POSTS: Post[] = [
  {
    slug: "how-to-reduce-image-size-in-kb",
    title: "How to Reduce Image Size in KB (on Phone or Computer)",
    description:
      "Learn how to reduce an image to a specific size in KB on your phone or computer. Resize, pick the right format and compress to 50KB, 100KB or 200KB.",
    date: "2026-11-24",
    category: "Compression",
    toolSlug: "compress-image-to-50kb",
    blocks: [
      { type: "p", text: "You pick a photo, press upload and see an error: the file is too large. Many forms, apps and email systems set a maximum file size, and the limit is almost always written in kilobytes. The good news is that you can shrink a photo to a specific size in a minute, on a phone or a computer, without installing anything." },
      { type: "h2", text: "What does image size in KB actually mean?" },
      { type: "p", text: "An image has two kinds of size. The first is its dimensions, the width and height in pixels. The second is its file size, how much storage the file takes, measured in kilobytes (KB) or megabytes (MB). When a form says the image must be under 100KB, it is talking about the file size, although some forms also set a required width and height." },
      { type: "h2", text: "Three ways to make an image smaller" },
      { type: "ul", items: [
        "Reduce the dimensions. Fewer pixels means less data, and this usually saves the most space.",
        "Lower the quality. JPG and WebP are lossy formats, so a slightly lower quality setting removes detail you will barely notice.",
        "Choose a better format. JPG is the standard choice for photos, and WebP is often smaller still for websites. PNG files of photos are usually much larger.",
      ] },
      { type: "h2", text: "Step by step: reduce an image to a target size" },
      { type: "ol", items: [
        "Open the Compress Image to 50KB tool, or the 20KB, 100KB or 200KB version that matches your limit.",
        "Upload your photo. On a phone you can choose it from your gallery or files.",
        "Type the size your form asks for into the target size box.",
        "Wait a moment while the tool finds the highest quality that stays under the limit.",
        "Check the preview, then download the compressed image.",
      ] },
      { type: "p", text: "The tool counts 1 KB as 1,000 bytes, so the result also passes forms that count in 1,000s rather than 1,024s. Everything runs in your browser, so your photo is not uploaded." },
      { type: "h2", text: "Doing it on a phone" },
      { type: "p", text: "ImgSimplify works in a normal mobile browser. After you download the result, your browser saves it to your downloads or files app, and you can choose it from there when the upload form asks for a file. Keep the original photo in your gallery in case you need a larger version later." },
      { type: "h2", text: "If the image is still too big" },
      { type: "ul", items: [
        "Resize the image first with the Resize Image tool, then compress it.",
        "Crop away unnecessary background so the file size is spent on the subject.",
        "Try a slightly larger target if text in a scanned document looks blurry.",
        "Avoid screenshots of photos. Use the original photo file instead.",
      ] },
      { type: "p", text: "If the tool cannot reach your target without making the image tiny, it tells you and gives you the smallest result it could make. In that case, crop or resize first and try again." },
    ],
  },
  {
    slug: "image-too-large-for-upload-form",
    title: "Image Too Large for an Upload Form? How to Fix It",
    description:
      "Upload form rejecting your photo? Find out why images are too large, how to read the requirements and how to shrink a photo or scan to the right size.",
    date: "2026-11-22",
    category: "Compression",
    toolSlug: "compress-image-to-100kb",
    blocks: [
      { type: "p", text: "Few things are more annoying than finishing a long application form and having the last upload fail. The photo or scanned document that looked fine on your phone is suddenly too large, in the wrong format or the wrong shape. This guide explains why upload forms reject images and how to fix each problem quickly." },
      { type: "h2", text: "Why upload forms reject images" },
      { type: "ul", items: [
        "File size: the file is bigger than the limit, for example more than 100KB or 2MB.",
        "Format: the form accepts only JPG or PNG, while your file is WebP, AVIF or something else.",
        "Dimensions: the form needs a specific width and height, or a certain aspect ratio.",
      ] },
      { type: "h2", text: "Step 1: read the requirements exactly" },
      { type: "p", text: "Look next to the upload button for the accepted formats, the maximum size and any pixel dimensions. Write them down before you start, because fixing one problem should not create another. A file that is the right size but the wrong format will still be rejected." },
      { type: "h2", text: "Step 2: fix the format first" },
      { type: "p", text: "If your file is WebP or AVIF and the form wants JPG, convert it first with the WebP to JPG or AVIF to JPG tool. Renaming the file extension does not change the format, so simply renaming a .webp file to .jpg does not work reliably." },
      { type: "h2", text: "Step 3: fix the dimensions" },
      { type: "p", text: "If the form needs exact pixel dimensions, use the Resize Image tool and keep the aspect ratio lock on unless the form requires a different shape. If the shape is wrong, crop first and then resize." },
      { type: "h2", text: "Step 4: reduce the file size" },
      { type: "ol", items: [
        "Open the Compress Image to 100KB tool, or the 20KB, 50KB or 200KB version that matches your limit.",
        "Upload the file and enter the size from the form's requirements.",
        "Check the preview, especially any small text, then download the result.",
        "Upload the new file to the form.",
      ] },
      { type: "h2", text: "Photos and scanned documents need different care" },
      { type: "p", text: "A portrait photo can lose a little detail without looking wrong. A scanned page with small text needs more room, so if the text looks soft, increase your target size or scan at a slightly higher resolution. Zoom in on the preview before you upload." },
      { type: "h2", text: "A few extra tips" },
      { type: "ul", items: [
        "Keep your original files so you can make another version later.",
        "Use short file names with letters and numbers, since some forms are strict about special characters.",
        "Use a browser-based tool for ID photos and documents, so the files stay on your device while you edit them.",
      ] },
    ],
  },
  {
    slug: "compress-signature-image-under-20kb",
    title: "How to Compress a Signature Image Under 20KB",
    description:
      "Make a clean signature image under 20KB for online forms. Learn how to write, photograph or scan it, crop it tightly and compress it without losing clarity.",
    date: "2026-11-20",
    category: "Compression",
    toolSlug: "compress-image-to-20kb",
    blocks: [
      { type: "p", text: "Many online forms ask for a scanned signature as a small image, sometimes under 20KB. A signature is one of the easiest things to compress, because it is mostly white paper with a thin dark line. With a little preparation you can get a sharp result that fits comfortably under the limit." },
      { type: "h2", text: "Why signatures compress so well" },
      { type: "p", text: "Compression works best on images with large areas of one color and few details. A signature on plain white paper has exactly that, so it usually shrinks far more than a photo of a person. The cleaner the paper and the darker the ink, the smaller and sharper the final file." },
      { type: "h2", text: "How to prepare the signature" },
      { type: "ol", items: [
        "Sign on plain white paper with a dark pen, such as black or dark blue.",
        "Photograph it in even daylight, straight from above, or scan it if you can.",
        "Avoid shadows across the paper, which add noise and increase the file size.",
        "Crop tightly around the signature so there is little empty space.",
      ] },
      { type: "h2", text: "How to compress it under 20KB" },
      { type: "ol", items: [
        "Open the Compress Image to 20KB tool.",
        "Upload your cropped signature image.",
        "Keep the target at 20 KB, or enter the limit your form asks for.",
        "Choose JPG as the output format for the widest compatibility.",
        "Check that the strokes are clear, then download the result.",
      ] },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Using grey or yellow paper, which looks noisy after compression.",
        "Leaving large blank margins around the signature.",
        "Taking the photo at an angle, which blurs one side.",
        "Using a thin, light pen that disappears at small sizes.",
      ] },
      { type: "h2", text: "If it still will not fit" },
      { type: "p", text: "If the tool cannot reach 20KB, crop the image tighter, retake the photo with better light, or resize it first with the Resize Image tool and compress it again. Always check the exact requirements shown next to the upload button, because the accepted format and dimensions differ from form to form." },
    ],
  },
];

// Extra sections appended to short existing articles. `updated` becomes dateModified.
export const POST_EXPANSIONS: Record<string, { updated: string; blocks: PostBlock[] }> = {
  "convert-webp-to-jpg": {
    updated: "2026-11-24",
    blocks: [
      { type: "h2", text: "WebP and JPG at a glance" },
      { type: "ul", items: [
        "WebP usually gives smaller files at similar quality and supports transparency.",
        "JPG opens almost everywhere, including older editors, print services and upload forms.",
        "Both formats are lossy for photos, so converting re-compresses the picture.",
      ] },
      { type: "h2", text: "Can I just rename the file to .jpg?" },
      { type: "p", text: "Renaming a .webp file to .jpg does not convert it. The data inside is still WebP, so some programs will open it and others will reject it or show an error. A real conversion re-encodes the picture as JPG, which is what the converter does." },
      { type: "h2", text: "Converting several images" },
      { type: "p", text: "The converter handles one image at a time. For a small batch, convert each file in turn and keep the originals until you have checked every result." },
      { type: "h2", text: "If the JPG is still rejected" },
      { type: "p", text: "A form can reject a correct JPG because the file is too large. In that case, use the Compress Image tool and set a target size such as 100KB or 200KB. If the shape is wrong, crop or resize the picture before you upload it." },
    ],
  },
  "image-to-base64-when-to-use": {
    updated: "2026-11-24",
    blocks: [
      { type: "h2", text: "What a data URL looks like" },
      { type: "p", text: "A data URL has three parts: the prefix data:, the media type such as image/png, and the word base64 followed by a comma and the encoded characters. Browsers read it like a normal file address, so you can use it anywhere an image URL is accepted, including the src of an image and the url() of a CSS background." },
      { type: "h2", text: "Performance trade-offs" },
      { type: "ul", items: [
        "The encoded text is about one third larger than the original file.",
        "An embedded image cannot be cached on its own, so it is downloaded again with every page or stylesheet that contains it.",
        "Large Base64 strings make HTML and CSS files bigger, which can slow down the first render.",
      ] },
      { type: "h2", text: "Compress the image before you encode it" },
      { type: "p", text: "Because encoding adds size, make the image as small as you can first. Resize it to the dimensions you need and compress it with the Compress Image tool, then convert the result to Base64. A 5KB icon becomes a short string, while a 500KB photo becomes a very long one." },
      { type: "h2", text: "A note on security policies" },
      { type: "p", text: "Some websites use a Content Security Policy that blocks data URLs for images. If your embedded image does not appear, check whether the policy allows data: sources. Also avoid pasting Base64 strings from untrusted sources into your pages without checking what they contain." },
    ],
  },
  "how-to-compress-images-without-losing-quality": {
    updated: "2026-11-24",
    blocks: [
      { type: "h2", text: "Choose the right format first" },
      { type: "ul", items: [
        "Photographs: JPG or WebP.",
        "Logos, icons and screenshots with sharp text: PNG or WebP.",
        "Images that need transparency: PNG or WebP, since JPG cannot store it.",
      ] },
      { type: "h2", text: "A simple compression checklist" },
      { type: "ol", items: [
        "Keep a copy of the original file.",
        "Resize the image to the size it will be displayed at.",
        "Compress it with a quality between 75% and 85%.",
        "Zoom in to check edges, text and smooth areas such as skies.",
        "Compare the new file size with your target and adjust if needed.",
      ] },
      { type: "h2", text: "Common mistakes to avoid" },
      { type: "ul", items: [
        "Compressing the same JPG again and again, which adds more loss each time.",
        "Enlarging a small image, which makes it blurry and does not add detail.",
        "Saving photographs as PNG, which creates very large files.",
        "Ignoring the pixel dimensions and relying on compression alone.",
      ] },
      { type: "h2", text: "Need an exact file size?" },
      { type: "p", text: "When a form or app sets a strict limit, use a target-size tool such as Compress Image to 50KB or 200KB. You enter the size and the tool finds the highest quality that fits, so you do not have to guess with the slider." },
    ],
  },
  "jpg-vs-png-vs-webp": {
    updated: "2026-11-24",
    blocks: [
      { type: "h2", text: "What about AVIF and GIF?" },
      { type: "p", text: "AVIF is a newer format that can produce even smaller files than WebP at good quality. Current browsers support it, but some editors and upload forms still do not, so convert it to JPG when compatibility matters. GIF is an older format that is mostly used for short animations and has a limited color range, so it is rarely the best choice for still images." },
      { type: "h2", text: "A quick decision guide" },
      { type: "ul", items: [
        "Photo on your website: WebP, with JPG as a fallback if you need maximum compatibility.",
        "Logo with a transparent background: PNG or WebP.",
        "Screenshot with small text: PNG, or lossless WebP.",
        "Photo for an upload form or email: JPG.",
        "Image you plan to edit again: keep an original in PNG or the camera's own format.",
      ] },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Using PNG for large photographs, which makes pages slow.",
        "Using JPG for logos with sharp edges, which can create visible artifacts.",
        "Converting a JPG to PNG and expecting the quality to improve. It does not restore lost detail.",
        "Forgetting that JPG fills transparent areas with a solid color.",
      ] },
      { type: "h2", text: "Related tools" },
      { type: "p", text: "You can switch between formats with the JPG to PNG, PNG to JPG, JPG to WebP and WebP to JPG converters. If a file is too large for a form, use the Compress Image tool and choose a target size." },
    ],
  },
};
