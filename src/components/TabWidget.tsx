import React, { FC, ReactElement, useEffect, useState } from 'react'
import styled, { th, useColor, x } from '@xstyled/emotion'
import { CustomIcon } from '../modules/topBar/Components/VibesTopBar';
import { lighten } from "color2k";

// TabPanelContainer
export const TabPanelContainer = ({ children, ...props }) => {
    const elements = React.Children.toArray(children);
    return (
        <x.div>
            {elements.map((el: any, idx) => React.cloneElement(el, { ...props, idx }))}
        </x.div>
    );
}

// TabPanel
interface TabPanelProps {
    idx?: number;
    selectedTab?: number | undefined;
    children?: any;
}
export const TabPanel = (props: TabPanelProps) => {
    const { selectedTab, idx, children } = props;
    return (
        <x.div display={idx === selectedTab ? 'block' : 'none'}>
            {children}
        </x.div>
    );
}

// TabItem
const TabItemStyled = styled.div<{ selected?: boolean, hoverBackgroundColor?: string }>`
    display: flex;
    align-items: center;
    padding: 1em 1em;
    border-radius: 8px;
    cursor: pointer;
    opacity: ${({ selected }) => selected ? 1 : 0.3};
    &:hover {
        opacity: 1;
        background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
    }
    & p {
        position: relative;
        white-space: nowrap;
        &:after {
            content: "";
            display: ${({ selected }) => (selected ? "inline-block" : "none")};
            position: absolute;
            bottom: -10px;
            width: 32px;
            max-width: 100%;
            height: 2px;
            left: 10px;
            background-color: ${th.color("primary")};
        }
    }
`;

interface TabItemProps {
    idx: number;
    icon?: string;
    selected?: boolean;
    children?: any;
    activeTab?: number | undefined;
    handleTabClick: (idx: number) => void;
}

export const TabItem: FC<TabItemProps> = ({ idx, icon, activeTab, children, selected, handleTabClick }) => {
    const hoverBackgroundColor = lighten(useColor('background'), 0.05);
    useEffect(() => {
        if (selected) handleTabClick(idx);
        return () => handleTabClick(0); // this makes sure that if the tab is removed, the first tab becomes default.
    }, []);

    const onClick = () => {
        handleTabClick(idx);
    }
    return (
        <x.div onClick={onClick}>
            <TabItemStyled selected={idx === activeTab} hoverBackgroundColor={hoverBackgroundColor}>
                {icon &&
                    <x.div mr={"0.5em"}>
                        <CustomIcon name={icon} size={"1em"} color={idx === activeTab ? "primary" : "textSecondary"} />
                    </x.div>
                }
                <x.p color={idx === activeTab ? 'primary' : 'white'}>{children}</x.p>
            </TabItemStyled>
        </x.div>
    );
};

// TabsContainer
const TabsContainerStyled = styled.div`
    display: flex;
    padding: 1em 0em;
    align-items: center;
    justify-content: space-between;
    overflow-x: auto;
    position: sticky;
    top: 0;
    background-color: ${th.color("background")};
    z-index: 5;
`;

interface TabsContainerProps {
    children: any;
    handleTabChange: (tabIndex: number) => void;
}

export const TabsContainer: FC<TabsContainerProps> = ({ children, handleTabChange, ...props }) => {
    const [activeTab, setActiveTab] = useState<number | undefined>(undefined);
    const handleTabClick = (index: number) => {
        setActiveTab(index);
        handleTabChange(index);
    }
    const elements: any[] = React.Children.toArray(children);
    const tabElements = React.Children.toArray(elements[0].props.children); // left section of tab
    const sideContents = elements.length > 1 && elements[1]; // right section of tab

    return (
        <TabsContainerStyled>
            <x.div display="flex">
                {tabElements.map((el: any, idx) =>
                    React.cloneElement(el, { ...props, activeTab, handleTabClick, idx }))
                }
            </x.div>
            {sideContents && React.cloneElement(sideContents, { ...props })}
        </TabsContainerStyled>
    );
}

// TabWidget
interface TabWidgetProps {
    children: ReactElement[];
}

export const TabWidget: FC<TabWidgetProps> = ({ children, ...props }) => {
    const [selectedTab, setSelectedTab] = useState<number | undefined>(undefined);
    const elements = React.Children.toArray(children);
    const handleTabChange = (tabIndex: number) => {
        setSelectedTab(tabIndex);
    }
    return (
        <x.div>
            <x.div display="flex" flexDirection="column">
                {React.isValidElement(elements[0]) && React.cloneElement(elements[0], { ...props, handleTabChange })}
                {React.isValidElement(elements[1]) && React.cloneElement(elements[1], { ...props, selectedTab })}
            </x.div>
        </x.div>
    )
}
