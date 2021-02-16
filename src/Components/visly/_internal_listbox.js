// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
/* tslint:disable */
/* eslint-disable */
import React, { useRef, useContext, useEffect } from "react";
import {
  useListBox,
  useListState,
  useOption,
  useFocusRing,
  mergeProps,
  useSingleSelectListState,
  usePress,
} from "@visly/core";
import { usePrimitive } from "./_internal_usePrimitive";
import { combineRef, exists, noop, renderChildren } from "./_internal_utils";
import { ItemContext, renderCollection } from "./_internal_collection";
import { injectSpacing } from "./_internal_component_utils";
import { useFormLabel } from "./_internal_formlabel";

function Option({ item, state, onItemPressed }) {
  const ref = React.useRef();
  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
      shouldSelectOnPressUp: true,
    },
    state,
    ref
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const { pressProps } = usePress({
    isDisabled,
    onPress: onItemPressed,
  });
  return (
    <li {...mergeProps(optionProps, focusProps, pressProps)} ref={ref}>
      <ItemContext.Provider
        value={{
          isSelected,
          isFocused: isFocusVisible,
          key: item.key,
        }}
      >
        {item.rendered}
      </ItemContext.Provider>
    </li>
  );
}

export function ListboxItemPrimitive(props) {
  const ref = useRef();
  const { isSelected, isFocused, key } = useContext(ItemContext) || {};
  const { style, testId, innerRef, values, vislyProps } = usePrimitive({
    ignoreFocusHandling: true,
    isFocusVisible: isFocused,
    ref,
    props,
    variants: isSelected
      ? [
          {
            propName: "selected",
          },
        ]
      : [],
  });
  return (
    <div
      key={key}
      ref={combineRef(props.measureRef, combineRef(innerRef, ref))}
      data-testid={testId}
      {...vislyProps}
      style={style}
    >
      {renderChildren(props.children, values)}
    </div>
  );
}
export function ListboxPrimitive(props) {
  if (props.selectionMode === "multiple") {
    return (
      <ListboxMultipleSelect
        {...props}
        onSelectionChange={(values) =>
          exists(props.onSelectionChange) &&
          props.onSelectionChange(Array.from(values))
        }
      />
    );
  }

  return (
    <ListboxSingleSelect
      {...props}
      selectionMode={props.selectionMode}
      onSelectionChange={(value) =>
        exists(props.onSelectionChange) && props.onSelectionChange(value)
      }
    />
  );
}

function parseSingleSelection(selection) {
  if (selection === "all") {
    return undefined;
  } else {
    return selection.values().next().value;
  }
}

function parseMultipleSelection(selection) {
  if (selection === "all") {
    return undefined;
  } else {
    return Array.from(selection);
  }
}

function ListboxSingleSelect(props) {
  const ref = useRef(null);
  const {
    children,
    selectedKeys,
    renderInline,
    onSelectionChange,
    disabledKeys,
  } = props;
  const { style, testId, vislyProps, values } = usePrimitive({
    ref,
    props,
  });
  const state = useSingleSelectListState({
    children: renderCollection(children),
    selectedKey: selectedKeys,
    onSelectionChange,
    disallowEmptySelection: false,
    disabledKeys,
  });
  const { label, registerLabelProps } = useFormLabel();
  const { listBoxProps, labelProps } = useListBox(
    {
      ...props,
      disallowEmptySelection: false,
      selectedKeys: [selectedKeys],
      onSelectionChange: (values) =>
        onSelectionChange(parseSingleSelection(values)),
      label,
      disabledKeys,
    },
    state,
    ref
  );
  useEffect(() => {
    registerLabelProps(labelProps);
  }, []);
  return (
    <ListboxPrimitiveImpl
      {...props}
      listBoxProps={listBoxProps}
      vislyProps={vislyProps}
      renderInline={renderInline}
      values={values}
      testId={testId}
      style={style}
      vislyRef={ref}
      state={state}
    />
  );
}

function ListboxMultipleSelect(props) {
  const ref = useRef(null);
  const {
    children,
    selectedKeys,
    renderInline,
    onSelectionChange,
    disabledKeys,
  } = props;
  const { style, testId, vislyProps, values } = usePrimitive({
    ref,
    props,
  });
  const state = useListState({
    children: renderCollection(children),
    selectionMode: "multiple",
    selectedKeys,
    onSelectionChange: (keys) => {
      onSelectionChange(parseMultipleSelection(keys));
    },
    disallowEmptySelection: false,
    disabledKeys,
  });
  const { label, registerLabelProps } = useFormLabel();
  const { listBoxProps, labelProps } = useListBox(
    {
      ...props,
      disallowEmptySelection: false,
      selectedKeys,
      onSelectionChange: (values) =>
        onSelectionChange(parseMultipleSelection(values)),
      label,
      disabledKeys,
    },
    state,
    ref
  );
  useEffect(() => {
    registerLabelProps(labelProps);
  }, []);
  return (
    <ListboxPrimitiveImpl
      {...props}
      listBoxProps={listBoxProps}
      vislyProps={vislyProps}
      renderInline={renderInline}
      values={values}
      testId={testId}
      style={style}
      vislyRef={ref}
      state={state}
    />
  );
}

export function ListboxPrimitiveImpl(props) {
  const {
    listBoxProps,
    vislyProps,
    renderInline,
    style,
    testId,
    values,
    vislyRef,
    state,
    onItemPressed = noop,
  } = props;

  if (renderInline) {
    return (
      <ul
        {...vislyProps}
        ref={combineRef(vislyRef, props.measureRef)}
        style={style}
      >
        <ItemContext.Provider
          value={{
            isSelected: false,
            isFocused: false,
            key: null,
          }}
        >
          {props.addSpacing
            ? injectSpacing(
                props.addSpacing,
                renderChildren(props.vislyChildren, values)
              )
            : renderChildren(props.vislyChildren, values)}
        </ItemContext.Provider>
      </ul>
    );
  }

  const children = [...state.collection].map((item) => (
    <Option
      key={item.key}
      item={item}
      state={state}
      onItemPressed={onItemPressed}
    />
  ));

  const _children = injectSpacing(props.addSpacing, children);

  const listProps = mergeProps(listBoxProps, vislyProps);
  return (
    <ul
      {...listProps}
      ref={combineRef(vislyRef, props.measureRef)}
      style={style}
      data-testid={testId}
      onKeyDownCapture={(e) => {
        if (e.key !== "Escape") {
          listProps.onKeyDownCapture(e);
        }
      }}
    >
      {_children}
    </ul>
  );
}
