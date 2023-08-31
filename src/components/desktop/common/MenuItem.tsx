import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const MenuItemCmpt = styled(Menu.Item)`
  &::before {
    background: #7c7c7c !important;
  }
  .header {
    text-align: left !important;
    flex-direction: initial !important;
    font-family: NotoSansCJKkr-Medium;
    font-size: 16px !important;
    font-weight: 100 !important;
    color: #ffffff !important;
  }
  .item {
    text-align: left !important;
    flex-direction: initial !important;
    &.item-menu {
      font-family: NotoSansCJKkr-Regular;
      font-size: 14px !important;
      color: #7c7c7c !important;
      /* height: 34px;
      display: flex;
      align-items: center; */
      &:hover,
      &.active {
        color: var(--company-identity-color, #0000ff) !important;
        font-weight: bold;
        background-color: #2e2e2e;
      }
      transition: all 0.4s;

      &.single-menu {
        font-size: 16px !important;
        padding: 0px;
        font-family: NotoSansCJKkr-Medium;
        display: flex;
        margin-bottom: 0px !important;
        justify-content: space-between;
        align-items: center;
        color: #ffffff !important;
        &:hover,
        &.active {
          color: var(--company-identity-color, #0000ff) !important;
          font-weight: bold;
        }
      }
    }
  }
`;

type menuType = {
  id: string;
  key: number;
  active?: boolean;
  class?: string;
  name?: string;
  to?: string;
  disabled?: boolean;
  icon?: IconProp;
  as?: string;
  rest?: any;
};

type MenuItemProps = {
  items: {
    header: string | undefined;
    show: boolean;
    menu: menuType[];
    type: string;
  };
};

function MenuItem({ items }: MenuItemProps) {
  return (
    <MenuItemCmpt>
      {' '}
      {items?.type !== 'single' ? (
        <>
          {items?.header && <Menu.Header>{items?.header}</Menu.Header>}
          <Menu.Menu>
            {items?.menu &&
              items.menu.map(
                (item) =>
                  !item?.disabled && (
                    <Menu.Item
                      key={item.key}
                      as={item?.as ?? Link}
                      to={item?.to ?? '/amons'}
                      className={`item-menu ${item?.class ?? ''}`}
                      active={item?.active ?? false}
                      {...item?.rest}
                    >
                      {item?.name ?? `Menu-${item.key}`}
                    </Menu.Item>
                  ),
              )}
          </Menu.Menu>
        </>
      ) : (
        items?.menu.map((item) => (
          <Menu.Item
            key={item.key}
            as={item?.as ?? Link}
            to={item?.to ?? '/amons'}
            className={`single-menu item-menu ${item?.class ?? ''}`}
            active={item?.active ?? false}
            {...item?.rest}
          >
            {item?.name}
            {item?.icon && <FontAwesomeIcon icon={item?.icon} />}
          </Menu.Item>
        ))
      )}
    </MenuItemCmpt>
  );
}

export default MenuItem;
