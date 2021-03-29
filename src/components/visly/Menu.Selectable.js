// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
/* tslint:disable */
/* eslint-disable */
import "./textstyles/fonts.css";
import "./reset.css";
import "./Menu.Selectable.css";
import React, { createContext, useContext } from "react";
import {
  exists,
  findSetVariantProps,
  makeCompositeDefaultProps,
} from "./_internal_utils";
import {
  SpacerPrimitive,
  TextPrimitive,
  IconPrimitive,
} from "./_internal_primitives";
import { MenuItemRoot } from "./_internal_menu";
import * as icons from "./icons";

const styles = [
  {
    type: "default",
    layers: {
      BQEFCgjjJC: {
        none: {
          text: "Selectable item",
        },
      },
      PXGX4TkGEx: {
        none: {
          icon: icons.vislyCheck,
          useMask: true,
        },
        hover: {
          useMask: true,
        },
        focus: {
          useMask: true,
        },
      },
    },
  },
  {
    type: "boolean",
    propName: "selected",
    layers: {
      PXGX4TkGEx: {
        none: {
          useMask: true,
        },
        disabled: {
          useMask: true,
        },
      },
    },
  },
];

const defaultPropValues = [
  {
    type: "default",
    layers: {},
  },
  {
    type: "boolean",
    propName: "selected",
    layers: {},
  },
];

const variantPropTypes = [
  {
    type: "boolean",
    propName: "selected",
  },
];

export const SelectableContext = createContext(null);

function Selectable(_props) {
  const defaults = useContext(SelectableContext);
  const props = { ...defaults, ..._props };
  const activeVariants = findSetVariantProps(variantPropTypes, props);
  const getCompositeDefaultProps = makeCompositeDefaultProps(
    defaultPropValues,
    activeVariants
  );
  return (
    <MenuItemRoot
      {...props}
      key="menu-checkable"
      addSpacing={false}
      internal={{
        projectId: "7X7HTLRqyD",
        styles: styles,
        layerId: "menu-checkable",
        scope: "7oadCW5FEe",
        activeVariants: activeVariants,
      }}
    >
      {(getStyle) => (
        <>
          <IconPrimitive
            id={"Icon_PXGX4TkGEx"}
            className={
              "__visly_reset_7X7HTLRqyD __visly_scope_7oadCW5FEe_PXGX4TkGEx"
            }
            key={"PXGX4TkGEx"}
            useMask={getStyle("PXGX4TkGEx", "useMask")}
            src={getStyle("PXGX4TkGEx", "icon")}
          />
          <SpacerPrimitive
            id={"Spacer_UoGGqVmdbn"}
            className={
              "__visly_reset_7X7HTLRqyD __visly_scope_7oadCW5FEe_UoGGqVmdbn"
            }
            key={"UoGGqVmdbn"}
          />
          <TextPrimitive
            id={"text_BQEFCgjjJC"}
            className={
              "__visly_reset_7X7HTLRqyD __visly_scope_7oadCW5FEe_BQEFCgjjJC"
            }
            key={"BQEFCgjjJC"}
            text={
              exists(props.text) ? props.text : getStyle("BQEFCgjjJC", "text")
            }
            element={getStyle("BQEFCgjjJC", "htmlElement")}
          />
        </>
      )}
    </MenuItemRoot>
  );
}

Selectable.__variants = [
  {
    name: "selected",
    type: "variant",
  },
];

export default Selectable;