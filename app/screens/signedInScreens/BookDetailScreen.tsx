import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView, FlatList } from "react-native";
import { SignedInProps } from "../../navigation/SignedIn";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { colors, icons } from "../../assets/theme";
import { store } from "../../redux/store";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import scaleSize from "../../assets/scale";
import Svg from "react-native-svg";
import LoadingScreen from "../LoadingScreens";
import { bookDetailRequest } from "../../redux/auth/actions";

interface BookDetailScreenProps {
    route: {
        params: {
            bookId: string;
        };
    };
}
const StarsSize = scaleSize(24);
const ButtonIconSize = scaleSize(20);
const CommentnIconSize = scaleSize(16);
const { width, height } = Dimensions.get('screen');

interface bookDetail {
    id: string;
    picture: string;
    name: string;
    eBookPrice: number;
    bookPrice: string;
    audioBookPrice: string;
    discountPercent: string;
    hasAudio: boolean;
    hasPdf: boolean;
    hasSale: boolean;
    authors: string;
    introduction: string;
    youtubeIntroLink: string;
    is_paid_book: boolean;
    is_paid_ebook: boolean;
    is_paid_audio_book: boolean;
    pdfPath: string;
    isEpub: boolean;
    isPdf: boolean;
    audioChapters: any;
}
interface bookComment {
    userName: string;
    date: string;
    comment: string;
}

const BookDetailScreen = ({ navigation, route }: { navigation: SignedInProps, route: BookDetailScreenProps }) => {
    // @ts-ignore
    const { bookId } = route.params;
    const user = store.getState().auth.user;
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.theme);
    const activeIcons = icons[theme];
    const activeColors = colors[theme];
    const { StarFill, StarOutline, PlayWhite, DocumentButton } = activeIcons;
    const [isLoading, setisLoading] = useState(false);
    const [bookDetailData, setBookDetailData] = useState<bookDetail>();
    const [bookCommentData, setBookCommentData] = useState<bookComment[]>();

    useEffect(() => {
        console.log(bookId);
        getData();
    }, []);
    async function getData() {
        setisLoading(true);
        const response = await dispatch(bookDetailRequest(bookId));
        setBookDetailData(response.payload['responseData']['book']);
        setBookCommentData(response.payload['responseData']['comments']);
        setisLoading(false);
    }
    const styles = StyleSheet.create({
        body: {
            flex: 1,
            backgroundColor: activeColors.background,
        },
        coverImage: {
            width: scaleSize(260),
            height: scaleSize(260),
            alignSelf: 'center',
            marginBottom: scaleSize(28),
            backgroundColor: activeColors.loadinMainColor
        },
        font20: {
            fontWeight: '500',
            fontSize: scaleSize(20),
            lineHeight: scaleSize(30),
            fontFamily: 'GratoGrotesk-Medium',
            color: activeColors.mainTextColor
        },
        font20_gray: {
            marginLeft: scaleSize(12),
            fontWeight: '400',
            fontSize: scaleSize(20),
            lineHeight: scaleSize(30),
            fontFamily: 'GratoGrotesk-Medium',
            color: activeColors.subTextColor
        },
        font16: {
            fontWeight: '400',
            fontSize: scaleSize(16),
            lineHeight: scaleSize(24),
            marginTop: scaleSize(4),
            fontFamily: 'GratoGrotesk-Medium',
            color: activeColors.subTextColor
        },
        font14: {
            fontWeight: '500',
            fontSize: scaleSize(14),
            lineHeight: scaleSize(21),
            marginLeft: scaleSize(12),
            fontFamily: 'GratoGrotesk-Medium',
            color: activeColors.white
        },
        font14_default: {
            fontWeight: '500',
            fontSize: scaleSize(14),
            lineHeight: scaleSize(21),
            fontFamily: 'GratoGrotesk-Medium',
            color: activeColors.text
        },
        font14_light: {
            fontWeight: '300',
            fontSize: scaleSize(14),
            lineHeight: scaleSize(21),
            fontFamily: 'GratoGrotesk-Thin',
            color: activeColors.mainTextColor,
        },
        font14_bold: {
            fontWeight: '600',
            fontSize: scaleSize(14),
            lineHeight: scaleSize(21),
            fontFamily: 'GratoGrotesk-Medium',
            color: activeColors.text,
            marginBottom: scaleSize(12)
        },
        font14_regular: {
            fontWeight: '500',
            fontSize: scaleSize(14),
            lineHeight: scaleSize(21),
            fontFamily: 'GratoGrotesk-Medium',
            color: activeColors.white
        },
        font14_line: {
            fontWeight: '500',
            fontSize: scaleSize(14),
            lineHeight: scaleSize(21),
            marginLeft: scaleSize(12),
            fontFamily: 'GratoGrotesk-Medium',
            color: activeColors.buttonLineColor
        },
        font12: {
            fontWeight: '600',
            fontSize: scaleSize(12),
            lineHeight: scaleSize(18),
            fontFamily: 'GratoGrotesk-Medium',
            color: activeColors.subButtonBorderColor
        },
        font10: {
            fontWeight: '400',
            fontSize: scaleSize(10),
            lineHeight: scaleSize(15),
            marginLeft: scaleSize(8),
            fontFamily: 'GratoGrotesk-Medium',
            color: activeColors.subTextColor
        },
        main_body: {
            paddingHorizontal: scaleSize(38),
            paddingVertical: scaleSize(24)
        },
        button_body: {
            flexDirection: 'row',
            justifyContent: "space-between",
            paddingHorizontal: scaleSize(32),
            paddingVertical: scaleSize(14)
        },
        book_category_container: {
            flexDirection: 'row',
            marginTop: scaleSize(10)
        },
        book_category: {
            borderWidth: 1,
            borderRadius: scaleSize(24),
            paddingHorizontal: scaleSize(12),
            paddingVertical: scaleSize(4),
            marginRight: scaleSize(8),
            borderColor: activeColors.subButtonBorderColor,
        },
        star_container: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scaleSize(8),
            marginTop: scaleSize(16)
        },
        star_box: {
            height: scaleSize(24),
            width: scaleSize(24),
            marginRight: scaleSize(4)
        },
        button_primary: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scaleSize(8),
            paddingVertical: scaleSize(16),
            backgroundColor: activeColors.primary,
            width: (width - scaleSize(32 * 2) - scaleSize(15)) / 2,
        },
        button_disable: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scaleSize(8),
            paddingVertical: scaleSize(16),
            backgroundColor: activeColors.secondary,
            width: (width - scaleSize(32 * 2) - scaleSize(15)) / 2,
        },
        button_line: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scaleSize(8),
            paddingVertical: scaleSize(16),
            borderWidth: 1,
            borderColor: activeColors.buttonLineColor,
            width: (width - scaleSize(32 * 2) - scaleSize(15)) / 2,
        },
        comment_star_container: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scaleSize(4)
        },
        commentContainer: {
            flexDirection: 'row',
            marginVertical: scaleSize(16)
        },
        commentUserPhoto: {
            height: scaleSize(48),
            width: scaleSize(48)
        },
        commentHeader_container: {
            marginLeft: scaleSize(20),
            justifyContent: 'center'
        }
    })
    return (
        <View style={styles.body}>
            <Header type="subheader" title="Harry Potter and the Sorc..." customeFunction={() => { }} />
            <View style={{ flex: 1 }}>
                <LoadingScreen isLoading={isLoading} pageName={'BookDetail'} />
                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                    <View style={styles.main_body}>
                        <Image
                            key={Math.random()}
                            source={{ uri: bookDetailData?.picture }}
                            style={styles.coverImage}
                        />
                        <Text style={styles.font20}>{bookDetailData?.name}</Text>
                        <Text style={styles.font16}>{bookDetailData?.authors}</Text>
                        <View style={styles.star_container}>
                            <StarFill height={StarsSize} width={StarsSize} style={styles.star_box} />
                            <StarFill height={StarsSize} width={StarsSize} style={styles.star_box} />
                            <StarFill height={StarsSize} width={StarsSize} style={styles.star_box} />
                            <StarFill height={StarsSize} width={StarsSize} style={styles.star_box} />
                            <StarOutline height={StarsSize} width={StarsSize} style={styles.star_box} />
                            <Text style={styles.font20_gray}>{'4.0'}</Text>
                        </View>
                        <View style={styles.book_category_container}>
                            <TouchableOpacity style={styles.book_category}>
                                <Text style={styles.font12}>{'Fantasy'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.book_category}>
                                <Text style={styles.font12}>{'Drama'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.book_category}>
                                <Text style={styles.font12}>{'Fiction'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.button_body}>
                        <TouchableOpacity style={bookDetailData?.hasAudio ? styles.button_primary : styles.button_disable}>
                            <PlayWhite height={ButtonIconSize} width={ButtonIconSize} />
                            <Text style={styles.font14}>{'Play Audio'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            // @ts-ignore
                            navigation.navigate('BookReadEpub');
                        }} style={styles.button_line}>
                            <DocumentButton height={ButtonIconSize} width={ButtonIconSize} />
                            <Text style={styles.font14_line}>{'Read Book'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.main_body}>
                        <Text style={styles.font14_bold}>{'Номын тухай'}</Text>
                        <Text style={styles.font14_light}>{`${bookDetailData?.introduction}`}</Text>
                    </View>
                    <View style={styles.main_body}>
                        <Text style={styles.font14_bold}>{'Сэтгэгдэл'}</Text>
                        <FlatList
                            data={bookCommentData}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={{ width: width }}>
                                    <View style={styles.commentContainer}>
                                        <Image
                                            key={Math.random()}
                                            source={require('../../assets/icons/testUser.png')}
                                            style={styles.commentUserPhoto}
                                        />
                                        <View style={styles.commentHeader_container}>
                                            <Text style={styles.font14_default}>{item.userName}</Text>
                                            <View style={styles.comment_star_container}>
                                                <StarFill height={CommentnIconSize} width={CommentnIconSize} style={styles.star_box} />
                                                <StarFill height={CommentnIconSize} width={CommentnIconSize} style={styles.star_box} />
                                                <StarFill height={CommentnIconSize} width={CommentnIconSize} style={styles.star_box} />
                                                <StarFill height={CommentnIconSize} width={CommentnIconSize} style={styles.star_box} />
                                                <StarOutline height={CommentnIconSize} width={CommentnIconSize} style={styles.star_box} />
                                                <Text style={styles.font10}>{'2 days ago'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={styles.font14_light}>{item.comment}</Text>
                                </View>
                            )}
                            keyExtractor={item => item.userName}
                        />

                    </View>

                </ScrollView>
            </View>

        </View>
    );
}

export default BookDetailScreen;