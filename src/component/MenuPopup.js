import React, {useState, useEffect, useCallback} from 'react';
import {
  VStack,
  Text,
  Image,
  HStack,
  Heading,
  Pressable,
  Spinner,
} from '@gluestack-ui/themed';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  Download,
  Eye,
  FolderEdit,
  FolderMinus,
  MoreHorizontal,
  Trash2,
} from 'lucide-react-native';
import {Share} from 'lucide-react-native';
import {Lock} from 'lucide-react-native';

const MenuPopup = () => {
  return (
    <VStack
      alignSelf="flex-end"
      position="absolute"
      backgroundColor="#fff"
      padding={10}
      zIndex={1}
      elevation={2}
      borderRadius={'$sm'}
      width={responsiveScreenWidth(40)}
      top={responsiveScreenHeight(1)}
      end={responsiveScreenWidth(10)}>
      <Pressable>
        <HStack padding={5} alignItems="center" justifyContent="flex-start">
          <Eye size={20} color="#000" style={{marginRight: 10}} />
          <Text bold size="sm">
            View
          </Text>
        </HStack>
      </Pressable>
      <Pressable>
        <HStack padding={5} alignItems="center" justifyContent="flex-start">
          <Download size={20} color="#000" style={{marginRight: 10}} />
          <Text bold size="sm">
            Download
          </Text>
        </HStack>
      </Pressable>
      <Pressable>
        <HStack padding={5} alignItems="center" justifyContent="flex-start">
          <FolderEdit size={20} color="#000" style={{marginRight: 10}} />
          <Text bold size="sm">
            Rename
          </Text>
        </HStack>
      </Pressable>
      <Pressable>
        <HStack padding={5} alignItems="center" justifyContent="flex-start">
          <Share size={20} color="#000" style={{marginRight: 10}} />
          <Text bold size="sm">
            Share Link
          </Text>
        </HStack>
      </Pressable>
      <Pressable>
        <HStack padding={5} alignItems="center" justifyContent="flex-start">
          <FolderMinus size={20} color="#000" style={{marginRight: 10}} />
          <Text bold size="sm">
            Move
          </Text>
        </HStack>
      </Pressable>
      <Pressable>
        <HStack padding={5} alignItems="center" justifyContent="flex-start">
          <Lock size={20} color="#000" style={{marginRight: 10}} />
          <Text bold size="sm">
            Mark Private
          </Text>
        </HStack>
      </Pressable>
      <Pressable>
        <HStack padding={5} alignItems="center" justifyContent="flex-start">
          <Trash2 size={20} color="#FF7070" style={{marginRight: 10}} />
          <Text bold size="sm" color="#FF7070">
            Delete
          </Text>
        </HStack>
      </Pressable>
    </VStack>
  );
};

export default MenuPopup;
