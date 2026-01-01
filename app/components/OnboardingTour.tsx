"use client";

import { useEffect, useState } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HelpCircle } from "lucide-react";

export function OnboardingTour() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      doneBtnText: 'Finish',
      nextBtnText: 'Next',
      prevBtnText: 'Back',
      onDestroyed: () => {
        localStorage.setItem("hasSeenColorEngineTour", "true");
      },
      steps: [
        // LEFT SIDEBAR (Controls) -> Point Right
        {
          element: '#tour-brand-picker', 
          popover: {
            title: 'Pick Your Base',
            description: 'Start here. Click the swatch to pick your primary brand color.',
            side: "right", 
            align: 'center'
          }
        },
        {
          element: '#tour-harmony-selector',
          popover: {
            title: 'Choose Harmony',
            description: 'Switch between algorithms to generate the perfect secondary colors.',
            side: "right",
            align: 'center'
          }
        },
        
        // RIGHT SIDEBAR (Palette) -> Point Left (Since it's on the right edge)
        {
          element: '#tour-visual-palette',
          popover: {
            title: 'Visual Palette',
            description: 'Your generated colors appear here. Click 🔓 to lock them or use sliders to tweak.',
            side: "left", 
            align: 'start'
          }
        },

        // MIDDLE COLUMN (Work) -> Point Top (Safest for scrolling content)
        {
            element: '#tour-contrast-checker',
            popover: {
              title: 'Safety First',
              description: 'We automatically check contrast ratios for text and UI components.',
              side: "top", 
              align: 'center'
            }
          },
        {
          element: '#tour-export-section',
          popover: {
            title: 'Export Code & PDF',
            description: 'Get Tailwind config, CSS variables, or generate a PDF Brand Report.',
            side: "top",
            align: 'center'
          }
        }
      ]
    });

    driverObj.drive();
  };

  // Auto-start only if not seen before
  useEffect(() => {
    if (!mounted) return;
    const hasSeenTour = localStorage.getItem("hasSeenColorEngineTour");
    if (!hasSeenTour) {
        setTimeout(() => startTour(), 1000);
    }
  }, [mounted]);

  if (!mounted) return null;

  // VISUAL TRIGGER BUTTON (Fixed to bottom right)
  return (
    <button 
        onClick={startTour}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-800 hover:scale-105 transition-all font-bold text-sm border-2 border-slate-700"
    >
        <HelpCircle className="w-5 h-5" />
        <span>Take Tour</span>
    </button>
  );
}