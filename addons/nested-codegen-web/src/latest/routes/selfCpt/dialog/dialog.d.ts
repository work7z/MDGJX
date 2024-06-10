import * as React from "react";
import { AbstractPureComponent2 } from "@blueprintjs/core/src/common";
import { Props, MaybeElement } from "@blueprintjs/core/src/common/props";
import { IconName } from "@blueprintjs/core";
import { IBackdropProps, OverlayableProps } from "@blueprintjs/core/src/components/overlay/overlay";
export declare type DialogProps = IDialogProps;
/** @deprecated use DialogProps */
export interface IDialogProps extends OverlayableProps, IBackdropProps, Props {
    /**
     * Toggles the visibility of the overlay and its children.
     * This prop is required because the component is controlled.
     */
    isOpen: boolean;
    /**
     * Name of a Blueprint UI icon (or an icon element) to render in the
     * dialog's header. Note that the header will only be rendered if `title` is
     * provided.
     */
    icon?: IconName | MaybeElement;
    /**
     * Whether to show the close button in the dialog's header.
     * Note that the header will only be rendered if `title` is provided.
     *
     * @default true
     */
    isCloseButtonShown?: boolean;
    /**
     * CSS styles to apply to the dialog.
     *
     * @default {}
     */
    style?: React.CSSProperties;
    /**
     * Title of the dialog. If provided, an element with `Classes.DIALOG_HEADER`
     * will be rendered inside the dialog before any children elements.
     */
    title?: React.ReactNode;
    /**
     * Name of the transition for internal `CSSTransition`. Providing your own
     * name here will require defining new CSS transition properties.
     */
    transitionName?: string;
    /**
     * ID of the element that contains title or label text for this dialog.
     *
     * By default, if the `title` prop is supplied, this component will generate
     * a unique ID for the `<H4>` title element and use that ID here.
     */
    "aria-labelledby"?: string;
    /**
     * ID of an element that contains description text inside this dialog.
     */
    "aria-describedby"?: string;
}
export declare class Dialog extends AbstractPureComponent2<DialogProps> {
    static defaultProps: DialogProps;
    private titleId;
    static displayName: string;
    constructor(props: DialogProps);
    render(): JSX.Element;
    protected validateProps(props: DialogProps): void;
    private maybeRenderCloseButton;
    private maybeRenderHeader;
}
