import { pxTorpx, rpxTopx } from '../../utils/util'
import constants from '../../utils/constants'

const menuButton = wx.getMenuButtonBoundingClientRect()
const tabBarPaddingTop = menuButton.top
const tabBarHeight = menuButton.height
const totalHeight = pxTorpx(tabBarPaddingTop + tabBarHeight) + 15

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pageScrollDistance: {
            type: Number,
            value: 0,
            observer(newData) {
                const opacity = newData / tabBarPaddingTop > 1 ? 1 : newData / tabBarPaddingTop
                const backgroundStyle = `background-color: rgba(255, 255, 255, ${opacity})`
                const backgroundColor = opacity > 0.5 ? '#ffffff' : '#000000'
                const frontColor = opacity > 0.5 ? '#000000' : '#ffffff'
                const titleColor = opacity > 0.5 ? '#000000' : '#ffffff'
                wx.setNavigationBarColor({
                    backgroundColor,
                    frontColor,
                })
                this.setData({ backgroundStyle, opacity, titleColor })
            },
        },
        isFromShare: {
            type: String,
            value: '',
        },
        isCatchEvent: {
            type: Boolean,
            value: false,
        },
        background: {
            type: String,
            value: '#FFFFFF',
        },
        isOpacity: {
            type: Boolean,
            value: true,
        },
        isHeight: {
            type: Boolean,
            value: false,
        },
        title: {
            type: String,
            value: '',
        },
        color: {
            type: String,
            value: '',
        },
        isIcon: {
            type: Boolean,
            value: true,
        },
        backIconUrl: {
            type: String,
            value: '',
        },
        homeIconUrl: {
            type: String,
            value: '',
        },
        useIcon: {
            type: Boolean,
            value: false,
        },
        zIndex: {
            type: Number,
            value: 99,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        lightBackIcon: constants.lightBackIcon,
        navBackIcon: constants.navBackIcon,
        headerTop: tabBarPaddingTop,
        headerHeight: tabBarHeight,
        totalHeight: totalHeight,
        backgroundStyle: '',
        opacity: 0,
        titleColor: '#ffffff',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onBack() {
            if (this.properties.isCatchEvent) {
                this.triggerEvent('onBack')
            } else {
                wx.navigateBack()
            }
        },
        onHome() {
            wx.reLaunch({
                url: '/pages/community/community',
            })
        },
        getHeaderHeight() {
            const height = rpxTopx(totalHeight)
            return height
        },
    },
})
