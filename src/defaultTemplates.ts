import { textDefaultProps } from 'lego-bricks'
const defaultTextTemplates = [
  {
    text: '大标题',
    fontSize: '30px ',
    fontWeight: 'bold',
    tag: 'h2',
    name: 'LText',
    width: '100px'
  },
  {
    text: '正文内容',
    tag: 'p',
    name: 'LText',
    width: '100px'
  },
  {
    text: '链接内容',
    color: '#1890ff',
    textDecoration: 'underline',
    tag: 'p',
    name: 'LText',
    width: '100px'
  },
  {
    text: '按钮内容',
    backgroundColor: '#fff',
    tag: 'button',
    name: 'LText',
    width: '100px'
  }
]
export default defaultTextTemplates.map(template => ({ ...textDefaultProps, ...template }))