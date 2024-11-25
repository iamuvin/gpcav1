let secondaryWindow = null;

function openInSecondaryMonitor(event) {
  // Prevent the default link behavior
  event.preventDefault();

  // Get the URL from the link's href attribute
  const url = event.currentTarget.href;

  // Validate the URL
  if (!url) {
    console.error("Invalid URL: Cannot open the link.");
    return;
  }

  try {
    // Check if the secondary window exists and is not closed
    if (!secondaryWindow || secondaryWindow.closed) {
      // Open a new window for the secondary monitor
      secondaryWindow = window.open(
        url,
        "SecondaryMonitor",
        "width=1024,height=768,top=0,left=1920"
      );
    } else {
      // Force update the URL in the secondary window
      secondaryWindow.location.href = url;
    }

    // Focus the secondary window after updating its content
    if (secondaryWindow) {
      secondaryWindow.focus();

      // Ensure YouTube links behave correctly by reloading after a short delay
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        setTimeout(() => {
          secondaryWindow.location.reload();
        }, 500); // Add a small delay to handle YouTube's redirect mechanism
      }
    }
  } catch (error) {
    console.error("Failed to open link on the secondary monitor:", error);
  }
}

function openInMainMonitor(event) {
  // Default behavior for internal links; the page navigates on the same monitor
  console.log("Opening internal link:", event.currentTarget.href);
}

// Attach the functions to respective links
document.addEventListener("DOMContentLoaded", () => {
  // External links to be opened on the secondary monitor
  const externalLinks = document.querySelectorAll('a[data-external="true"]');
  externalLinks.forEach(link => {
    link.addEventListener("click", openInSecondaryMonitor);
  });

  // Internal links to be opened on the main monitor
  const internalLinks = document.querySelectorAll('a[data-external="false"]');
  internalLinks.forEach(link => {
    link.addEventListener("click", openInMainMonitor);
  });
});
