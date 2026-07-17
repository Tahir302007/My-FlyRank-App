import React, { useState, useRef } from "react";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
}

export const Tabs: React.FC<TabsProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState(items[0]?.id);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % items.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + items.length) % items.length;
    } else {
      return;
    }

    const nextTabId = items[newIndex].id;
    setActiveTab(nextTabId);
    tabRefs.current[nextTabId]?.focus();
  };

  return (
    <div className="w-full">
      <div role="tablist" aria-label="Project Tabs" className="flex border-b">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => { tabRefs.current[item.id] = el; }}
            role="tab"
            aria-selected={activeTab === item.id}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            tabIndex={activeTab === item.id ? 0 : -1}
            onClick={() => setActiveTab(item.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-4 py-2 ${activeTab === item.id ? "border-b-2 border-blue-500 font-bold" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {items.map((item) => (
          <div
            key={item.id}
            id={`panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${item.id}`}
            hidden={activeTab !== item.id}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};