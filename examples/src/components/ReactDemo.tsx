/** @jsxImportSource react */
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classigo from "classigo";
import "../styles.css";

const ReactDemo: React.FC = () => {
  const [variant, setVariant] = useState<"primary" | "secondary">("primary");
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [disabled, setDisabled] = useState(false);
  const [rounded, setRounded] = useState(false);
  const [outlined, setOutlined] = useState(false);
  const [openMenu, setOpenMenu] = useState<"variant" | "size" | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const variantRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0,
      );
    };
    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);
    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  const buttonClasses = classigo(
    "button",
    `button--${variant}`,
    `button--${size}`,
    disabled && "button--disabled",
    rounded && "button--rounded",
    outlined && "button--outlined",
  );

  const handleButtonClick = () => {
    console.log("Button clicked!", {
      variant,
      size,
      disabled,
      rounded,
      outlined,
    });
  };

  const handleSelectChange = (type: "variant" | "size", value: string) => {
    if (type === "variant") {
      setVariant(value as "primary" | "secondary");
    } else if (type === "size") {
      setSize(value as "small" | "medium" | "large");
    }
    setOpenMenu(null);
  };

  const toggleMenu = (menuType: "variant" | "size") => {
    setOpenMenu(openMenu === menuType ? null : menuType);
  };

  const closeAllMenus = () => {
    setOpenMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      closeAllMenus();
    };

    if (openMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openMenu]);

  const MenuPortal = () => {
    if (!openMenu) return null;

    const ref = openMenu === "variant" ? variantRef : sizeRef;
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return null;

    return createPortal(
      <div
        className={classigo(
          "select-menu-portal",
          openMenu && "select-menu-portal--visible"
        )}
        style={{
          position: "absolute",
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
          width: rect.width,
          zIndex: 1000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {openMenu === "variant" && (
          <>
            <div
              className={classigo("select-option", "select-option--variant")}
              onClick={() => handleSelectChange("variant", "primary")}
            >
              Primary
            </div>
            <div
              className={classigo("select-option", "select-option--variant")}
              onClick={() => handleSelectChange("variant", "secondary")}
            >
              Secondary
            </div>
          </>
        )}

        {openMenu === "size" && (
          <>
            <div
              className={classigo("select-option", "select-option--size")}
              onClick={() => handleSelectChange("size", "small")}
            >
              Small
            </div>
            <div
              className={classigo("select-option", "select-option--size")}
              onClick={() => handleSelectChange("size", "medium")}
            >
              Medium
            </div>
            <div
              className={classigo("select-option", "select-option--size")}
              onClick={() => handleSelectChange("size", "large")}
            >
              Large
            </div>
          </>
        )}
      </div>,
      document.body
    );
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            alt="React"
            className="title-logo"
          />
          React + Classigo Demo
        </h1>
        <p className="subtitle">
          Interactive button component demonstrating classigo with React hooks
          and CSS Modules integration.
        </p>
      </div>

      <div className="demo">
        <div className="buttonContainer">
          <button
            className={buttonClasses}
            disabled={disabled}
            onClick={handleButtonClick}
          >
            {variant} {size} button
          </button>
        </div>

        <div className="controls">
          <div className="selects-section">
            <h3>Button Properties</h3>
            <div className="selects-grid">
              <div
                ref={variantRef}
                className={classigo(
                  "select-item",
                  openMenu === "variant" && "select-item--active"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu("variant");
                }}
              >
                <div className="select-item-icon">🎨</div>
                <div className="select-item-content">
                  <div className="select-item-label">Variant</div>
                  <div className="select-item-value">{variant}</div>
                </div>
                <div className={classigo(
                  "select-item-chevron",
                  openMenu === "variant" && "select-item-chevron--active"
                )}>
                  ›
                </div>
              </div>

              <div
                ref={sizeRef}
                className={classigo(
                  "select-item",
                  openMenu === "size" && "select-item--active"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu("size");
                }}
              >
                <div className="select-item-icon">📏</div>
                <div className="select-item-content">
                  <div className="select-item-label">Size</div>
                  <div className="select-item-value">{size}</div>
                </div>
                <div className={classigo(
                  "select-item-chevron",
                  openMenu === "size" && "select-item-chevron--active"
                )}>
                  ›
                </div>
              </div>
            </div>
          </div>

          <div className="switches-section">
            <h3>Button States</h3>
            <div className="switches-grid">
              <div className="switch-container">
                <span className="switch-label">Disabled</span>
                <button
                  className={classigo("switch", disabled && "active")}
                  onClick={() => setDisabled(!disabled)}
                  type="button"
                />
              </div>

              <div className="switch-container">
                <span className="switch-label">Rounded</span>
                <button
                  className={classigo("switch", rounded && "active")}
                  onClick={() => setRounded(!rounded)}
                  type="button"
                />
              </div>

              <div className="switch-container">
                <span className="switch-label">Outlined</span>
                <button
                  className={classigo("switch", outlined && "active")}
                  onClick={() => setOutlined(!outlined)}
                  type="button"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="output">
          <span className="outputTitle">Generated className:</span>
          <code className="outputCode">{buttonClasses}</code>
        </div>
      </div>

      <MenuPortal />

      <div className="performance">
        <h3>⚡ Performance</h3>
        <p>
          classigo: 52M ops/sec • 159B bundle size • Ultra-optimized for CSS
          Modules
        </p>
      </div>

      <a href="../" className="backLink">← Back to Examples</a>
    </div>
  );
};

export default ReactDemo;
