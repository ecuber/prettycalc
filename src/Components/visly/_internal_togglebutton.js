// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
/* tslint:disable */
/* eslint-disable */
import React, { useRef } from "react";
import {
  mergeProps,
  useToggleState,
  useButton,
  chain,
  useFocusRing,
} from "@visly/core";
import { combineRef, renderChildren } from "./_internal_utils";
import { usePrimitive } from "./_internal_usePrimitive";
export function useToggleButton(props, state, ref) {
  const { isSelected } = state;
  const { isPressed, buttonProps } = useButton(
    {
      ...props,
      onPress: chain(() => state.setSelected(!isSelected), props.onPress),
    },
    ref
  );
  return {
    isPressed,
    buttonProps: mergeProps(buttonProps, {
      "aria-pressed": isSelected,
    }),
  };
}

function vislyToReactAriaProps(props) {
  return {
    isSelected: props.checked,
    onChange: props.onChange,
    isDisabled: props.disabled,
    ...props,
  };
}

export function ToggleButtonRoot(props) {
  const ref = useRef();
  const state = useToggleState(vislyToReactAriaProps(props));
  const { buttonProps, isPressed } = useToggleButton(
    { ...vislyToReactAriaProps(props) },
    state,
    ref
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const { style, testId, innerRef, values, vislyProps } = usePrimitive({
    ref,
    props,
    isPressed,
    ignoreFocusHandling: true,
    isFocusVisible,
    noUserSelect: true,
  });
  return (
    <button
      {...mergeProps(buttonProps, vislyProps, focusProps)}
      ref={combineRef(props.measureRef, combineRef(innerRef, ref))}
      data-testid={testId}
      style={style}
    >
      {renderChildren(props.children, values)}
    </button>
  );
}