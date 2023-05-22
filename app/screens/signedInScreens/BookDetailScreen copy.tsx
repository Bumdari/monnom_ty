import { StyleSheet, View, Text } from "react-native";
import { SignedInProps } from "../../navigation/SignedIn";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { colors, icons } from "../../assets/theme";


const BookDetailScreen = ({ navigation }: SignedInProps) => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.theme);
    const activeIcons = icons[theme];
    const activeColors = colors[theme];
    const { Appearance } = activeIcons;

    const styles = StyleSheet.create({
        body: {
            flex: 1,
            backgroundColor: activeColors.background,
        }
    })
    return (
        <View style={styles.body}>
            <Text>Book Detail Screen</Text>
        </View>
    );
}

export default BookDetailScreen;