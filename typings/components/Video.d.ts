import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  BackHandler,
  Animated,
  Image,
  Alert
} from 'react-native'

interface RNVideoProps {
  url: string | number;
  placeholder?: string | number;
  error?: boolean | object;
  loop?: boolean;
  autoPlay?: boolean;
  inlineOnly?: boolean;
  fullScreenOnly?: boolean;
  playInBackground?: boolean;
  playWhenInactive?: boolean;
  rotateToFullScreen?: boolean;
  lockPortraitOnFsExit?: boolean;
  onEnd?: () => void;
  onLoad?: () => void;
  onPlay?: () => void;
  onError?: () => void;
  onProgress?: () => void;
  onMorePress?: () => void;
  onFullScreen?: () => void;
  onTimedMetadata?: () => void;
  rate?: number;
  volume?: number;
  lockRatio?: number;
  logo?: string;
  title?: string;
  theme?: object,
  resizeMode?: string;
  style?: object;
}

export declare class Video extends React.Component<RNVideoProps> {} 