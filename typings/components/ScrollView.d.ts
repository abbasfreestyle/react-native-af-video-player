import React from 'react'
import {
  ScrollViewProps
} from 'react-native'

interface RNScrollProps extends ScrollViewProps {
  bouces?: boolean;
  onScroll?: () => void;
}

export declare class ScrollView extends React.Component<RNScrollProps> {}