import { StyleSheet, View, Text, Dimensions } from "react-native";
import { SignedInProps } from "../../navigation/SignedIn";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { colors, icons } from "../../assets/theme";
import SafeAreaBox from "../../components/SafeAreaBox";
import Pdf from 'react-native-pdf';

const BookReadScreen = ({ navigation }: SignedInProps) => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.theme);
    const activeIcons = icons[theme];
    const activeColors = colors[theme];
    const { Appearance } = activeIcons;
    const source = { uri: 'https://d36ow7fr399e3e.cloudfront.net/Bar_eezh_600e2ca37c.pdf', cache: true };

    const styles = StyleSheet.create({
        body: {
            flex: 1,
            backgroundColor: activeColors.background,
        },
        pdf: {
            flex: 1,
            backgroundColor: activeColors.background,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        }
    })
    return (
        <SafeAreaBox ph={0} pv={0} containerStyle={styles.pdf}>
            <Pdf
                trustAllCerts={false}
                source={source}
                horizontal={true}
                scale={1.0}
                minScale={0.5}
                maxScale={2.0}
                enablePaging={true}
                fitPolicy={0}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={[styles.pdf]} />
        </SafeAreaBox>
    );
}

export default BookReadScreen;