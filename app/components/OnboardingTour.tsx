"use client";

import { useEffect, useState } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function OnboardingTour() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // 1. Check if user has already seen the tour
    const hasSeenTour = localStorage.getItem("hasSeenColorEngineTour");
    if (hasSeenTour) return;

    // 2. Define the Tour Steps
    // We use standard CSS selectors (ids) to target elements
    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      doneBtnText: 'Finish',
      nextBtnText: 'Next',
      prevBtnText: 'Back',
      onDestroyed: () => {
        // 3. Mark as seen when closed/finished
        localStorage.setItem("hasSeenColorEngineTour", "true");
      },
      steps: [
        {
          element: '#tour-brand-picker', 
          popover: {
            title: 'Pick Your Base',
            description: 'Start by clicking the big color swatch to pick your primary brand color. Everything generates from this.',
            side: "right",
            align: 'start'
          }
        },
        {
          element: '#tour-harmony-selector',
          popover: {
            title: 'Choose Harmony',
            description: 'Switch between Analogous, Split-Complementary, etc. to find the perfect matching colors.',
            side: "right",
            align: 'start'
          }
        },
        {
          element: '#tour-visual-palette',
          popover: {
            title: 'Lock & Edit',
            description: 'Click the 🔓 icon to lock a color you like, or use the sliders to tweak HSL values manually.',
            side: "top",
            align: 'center'
          }
        },
        {
            element: '#tour-contrast-checker',
            popover: {
              title: 'Safety First',
              description: 'Check if your colors are accessible and WCAG compliant before you export.',
              side: "left",
              align: 'center'
            }
          },
        {
          element: '#tour-export-section',
          popover: {
            title: 'Export Code & PDF',
            description: 'Get Tailwind code, CSS variables, or download a full Brand Guidelines PDF report.',
            side: "top",
            align: 'center'
          }
        }
      ]
    });

    // 4. Start the tour after a short delay so the UI is ready
    setTimeout(() => {
        driverObj.drive();
    }, 1000);

  }, [mounted]);

  return null; // This component renders nothing visual itself
}