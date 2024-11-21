import { Text, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const placeHolderImage = require('@/assets/images/background-image.png');

export default function HomeScreen() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () =>{
    let result = ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      }
    );

    if(!(await result).canceled){
      setSelectedImage((await result).assets[0].uri)
    } else{
      console.log(" You did not select any image");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Home Screen</Text>
      <Link href="/about" style={styles.button}>Go to Home Screen</Link> */}
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={placeHolderImage} selectedImage={selectedImage}/>
      </View>
      <View style={styles.footerContainer}>
        <Button label='Choose the Photo' theme='primary' onPress={pickImageAsync}/>
        <Button label='Use this Photo' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
