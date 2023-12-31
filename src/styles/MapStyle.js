import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Breadcrumb, Collapse } from 'antd';

const fromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const mapAni = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const loading = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

const MapContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  gap: 15px;
  animation: ${fromLeft} 0.5s ease-in-out;
`;

const MapImage = styled.div`
  position: relative;
  overflow: auto;
  display: grid;
  place-items: center;
  /* flex-basis: 750px; */
  flex-basis: 60%;
  flex-shrink: 0;
  height: 100%;
  padding: 80px 30px;
  > svg {
    animation: ${mapAni} 0.5s ease-in-out;
    path {
      fill: ${props => props.color};
      stroke: ${props => props.stroke};
      /* transition: filter 0.2s ease-in-out; */
      &:hover {
        filter: brightness(1.2);
      }
    }
  }
`;

const MapInfo = styled(Breadcrumb)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 22px;
  font-weight: bold;
  ol {
    align-items: center;
  }
  li:last-child {
    color: #494949;
  }
  .ant-breadcrumb-separator {
    font-size: 14px;
  }
  .ant-breadcrumb-link > a {
    height: 100%;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: #1e88e5;
      background: rgba(30, 136, 229, 0.2);
    }
  }
`;

const NoMapInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  width: 100%;
  height: 100%;
  z-index: 999;
  > .ant-result {
    svg {
      background: #fff;
      border-radius: 50%;
    }
    div {
      text-shadow: 0px 0px 2px #000;
      color: #fff;
    }
  }
`;

const ColorPickerContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 30px;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    .ant-color-picker-clear {
      &::after {
        display: none;
      }
    }
    &:nth-of-type(1) {
      .ant-color-picker-clear {
        background: #fff;
      }
    }
    &:nth-of-type(2) {
      .ant-color-picker-clear {
        background: #000;
      }
    }
  }
`;

const TravelListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  padding: 10px 10px 15px;
  border-radius: 10px;
  box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.5);
  flex-basis: 40%;
  .list-filter-title {
    color: #494949;
    font-size: 22px;
    font-weight: bold;
    padding: 10px;
  }
`;

const TravelListFilter = styled(Breadcrumb)`
  font-size: 22px;
  font-weight: bold;
  padding: 10px;
  line-height: inherit;
  ol {
    align-items: center;
  }
  .ant-breadcrumb-separator {
    font-size: 14px;
  }
  .ant-breadcrumb-link {
    color: #494949;
  }
  .ant-breadcrumb-link > a {
    height: 100%;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #1e88e5;
      background: rgba(30, 136, 229, 0.2);
    }
  }
`;

const TravelItemCollapse = styled(Collapse)`
  background: #fff;
  overflow: auto;
  height: 100%;
  border: none;
  border-radius: 0;
  padding: 5px 10px;
  > .ant-collapse-item {
    margin-bottom: 15px;
    position: relative;
    padding: 15px;
    padding-bottom: 10px;
    border-bottom: none;
    border-radius: 5px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
    &:last-child {
      border-radius: 5px;
      margin-bottom: 0;
    }
    > .ant-collapse-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      padding: 0;
      position: static;
      padding-inline-start: 0;
      line-height: normal;
      color: #494949;
      > .ant-collapse-header-text {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        > .item-count {
          margin-left: 5px;
          padding: 2px 6px;
          font-size: 12px;
          background: #1e88e5;
          color: white;
          font-weight: normal;
          border-radius: 10px;
        }
      }
      > .ant-collapse-expand-icon {
        order: 1;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-inline-end: 0;
        margin-inline-start: 0;
        margin-top: 5px;
        > svg {
          transition: all 0.2s ease-in-out;
          font-size: 18px;
        }
      }
      > .ant-collapse-extra {
        width: 100%;
        > div {
          display: flex;
          gap: 15px;
          position: absolute;
          top: 15px;
          right: 15px;
          font-size: 18px;
          > svg {
            transition: all 0.3s ease-in-out;
            &:hover {
              color: #1e88e5;
              cursor: pointer;
            }
          }
        }
      }
    }
    > .ant-collapse-content {
      border-top: none;
      padding: 10px 0 5px;
      > .ant-collapse-content-box {
        padding: 0;
        > .no-todo {
          display: block;
          padding: 9px 13px;
          background-color: rgba(0, 0, 0, 0.01);
          color: #494949;
          border-radius: 5px;
          border: 1px solid #d9d9d9;
        }
      }
    }
  }
`;

const TodoItemCollapse = styled(Collapse)`
  background-color: rgba(0, 0, 0, 0.01);
  border-radius: 5px;
  > .ant-collapse-item {
    &:last-child {
      border-radius: 5px;
    }
    > .ant-collapse-header {
      padding-inline-start: 0;
      padding: 9px 13px;
      > .ant-collapse-header-text {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #494949;
        font-size: 15px;
        font-weight: bold;
      }
    }
    > .ant-collapse-content {
      color: #494949;
      > .ant-collapse-content-box {
        padding: 10px 13px 10px 22px;
        display: flex;
        flex-direction: column;
        gap: 7px;
      }
    }
  }
`;

const TravelItemLoading = styled.div`
  background: #fff;
  height: 100%;
  border: none;
  border-radius: 0;
  overflow: hidden;
  padding: 5px 10px 0px;
  > .item-loading {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    /* height: 97.5px; */
    margin-bottom: 15px;
    padding: 15px;
    padding-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
    font-size: 18px;
    color: #494949;
    &:last-child {
      border-radius: 5px;
      margin-bottom: 0;
    }
  }
`;

export {
  fromLeft,
  mapAni,
  loading,
  MapContainer,
  MapImage,
  MapInfo,
  NoMapInfo,
  ColorPickerContainer,
  TravelListContainer,
  TravelListFilter,
  TravelItemCollapse,
  TodoItemCollapse,
  TravelItemLoading,
};
