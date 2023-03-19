import { mapValues, without } from 'lodash-es'

/**
 * 数据文件
 */

// 组件属性
export interface CommonComponentProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string | number;
  lineHeight: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // show and opacity
  boxShadow: string;
  opacity: number;
  // position and x,y
  position: string;
  left: number | string;
  top: number | string;
  right: number;
  // src: string;
  href?: string;
}

export const commonDefaultProps: CommonComponentProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '',
  width: '318px',
  lineHeight: '',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  // show and opacity
  boxShadow: '0 0 0 #000000',
  opacity: 1,
  // position and x,y
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0
}

export interface TextComponentProps extends CommonComponentProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}

export interface ImageComponentProps extends CommonComponentProps {
  src: string;
}

export type TextImageComponentProps = TextComponentProps & ImageComponentProps

export const textDefaultProps: TextComponentProps = {
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  // lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  backgroundColor: '',
  ...commonDefaultProps
}

export const imageDefaultProps: ImageComponentProps = {
  ...commonDefaultProps,
  src: 'text.url'
}

// 属性
export const isEditingProp = {
  isEditing: {
    type: Boolean,
    default: false
  }
}

export const textStylePropNames = without(Object.keys(textDefaultProps), 'actionType', 'url', 'text')

export const imageStylePropsNames = without(Object.keys(imageDefaultProps), 'src')

// export const transformToComponentProps = <T extends {[key: string]: any}>(props: T) => {
export const transformToComponentProps = (props: TextComponentProps | ImageComponentProps) => {
  return mapValues(props, (item: any) => {
    return {
      /**
       * 要拿到props的类型，直接调用constructor的属性
       */
      type: item.constructor as StringConstructor,
      default: item
    }
  })
}