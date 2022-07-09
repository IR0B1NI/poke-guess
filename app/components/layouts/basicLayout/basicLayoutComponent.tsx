import React, { FunctionComponent, ReactNode } from 'react';

import TopMenu from '../../menus/topMenu';

interface IBasicLayoutProps {
    /** The children to render. */
    children: ReactNode;
}

/**
 * Basic layout that is rendered around it's child components.
 *
 * @param {IBasicLayoutProps} props The children to render.
 * @returns {FunctionComponent} The basic layout component.
 */
const BasicLayout: FunctionComponent<IBasicLayoutProps> = (props) => {
    return (
        <div className="flex flex-1 flex-col max-h-screen sm:overflow-hidden">
            <TopMenu />
            <div className="flex flex-1 flex-col sm:overflow-hidden">{props.children}</div>
        </div>
    );
};

export default BasicLayout;
