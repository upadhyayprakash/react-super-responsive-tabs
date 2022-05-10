import React, { FC } from "react";
import {
  TabItem,
  TabPanel,
  TabPanelContainer,
  TabsContainer,
  TabWidget,
} from "../TabWidget";

const Tabs: FC = () => {
  return (
    <div>
      <TabWidget>
        <TabsContainer>
          <div>
            {tabs.map(({ label, id, icon }, idx) => (
              <TabItem selected={idx === 0} icon={icon}>
                {label}
              </TabItem>
            ))}
          </div>

          {/* 2nd element is optional & rendered on right-side of the tab */}
          <div>
              {/* Top side controls */}
          </div>
        </TabsContainer>
        <TabPanelContainer>
          <TabPanel>{/* Content for Panel */}</TabPanel>
          <TabPanel>{/* Content for Panel */}</TabPanel>
          <TabPanel>{/* Content for Panel */}</TabPanel>
        </TabPanelContainer>
      </TabWidget>
    </div>
  );
};

export default Tabs;
