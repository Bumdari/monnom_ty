import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, useColorScheme, Text, TouchableOpacity, Image, View, FlatList, ScrollView, LogBox, Dimensions } from 'react-native';
import { store } from '../../redux/store';


import scaleSize from '../../assets/scale';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { colors, icons } from '../../assets/theme';
import Header from '../../components/Header';

import { SignedInProps } from '../../navigation/SignedIn';
import { useDispatch } from 'react-redux';
import { bookListRequest } from '../../redux/auth/actions';
import LoadingScreen from '../LoadingScreens';

interface bestBooksData {
    id: string;
    picture_path: string;
}

interface specialBookData {
    id: string;
    picture: string;
}
interface categoriesData {
    id: string;
    name: string;
}

interface audiobook {
    id: string;
    category_id: string;
    categories: bookCategory[];
    picture_path: string;
    authors: string;
    name: string;
    is_saved: boolean;
}
interface bookCategory {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    is_featured: string;
    sort: string;
}
interface book {
    category_id: string;
    category_name: string;
    books: bookDetail[];
    picture_path: string;
    authors: string;
    name: string;
    is_saved: boolean;
}
interface bookDetail {
    id: string;
    picture_path: string;
    authors: string;
    name: string;
    is_saved: boolean;
}
const { width, height } = Dimensions.get('screen');

const HomeScreen = ({ navigation }: SignedInProps) => {
    const user = store.getState().auth.user;
    const { theme } = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();
    const activeColors = colors[theme];
    const activeIcons = icons[theme];
    const [isLoading, setisLoading] = useState(false);
    const [categories, setCategories] = useState<categoriesData[]>([{ id: '1', name: 'Art' }, { id: '2', name: 'Business' }, { id: '3', name: 'Comedy' }, { id: '4', name: 'Drama' }]);
    const [bestBooks, setBestBooks] = useState<bestBooksData[]>([]);
    const [specialBook, setSpecialBook] = useState<specialBookData>();
    const [audioBooks, setAudioBooks] = useState<audiobook[]>([]);
    const [categoriesWithBooks, setCategoriesWithBooks] = useState<book[]>([]);

    const { StarFill, StarOutline } = activeIcons;

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setisLoading(true);
        const response = await dispatch(bookListRequest(user.id));
        setBestBooks(response['payload']['bestBooks']);
        setAudioBooks(response['payload']['audioBooks']);
        setSpecialBook(response['payload']['specialBook']);
        setCategoriesWithBooks(response['payload']['categoriesWithBooks']);
        setisLoading(false);
    }

    const styles = StyleSheet.create({
        categoryHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: scaleSize(24),
            paddingRight: scaleSize(28),
            marginTop: scaleSize(32),
            marginBottom: scaleSize(16)
        },
        categoryBody: {
            backgroundColor: activeColors.cardBackground,
            paddingHorizontal: scaleSize(16),
            paddingVertical: scaleSize(8),
            borderRadius: scaleSize(12),
            marginRight: scaleSize(12)
        },
        font16: {
            flex: 1,
            fontWeight: '500',
            paddingRight: scaleSize(16),
            fontSize: scaleSize(16),
            lineHeight: scaleSize(24),
            fontFamily: 'GratoGrotesk-Bold',
            color: activeColors.text
        },
        font16_line: {
            fontSize: scaleSize(16),
            lineHeight: scaleSize(24),
            fontWeight: '400',
            fontFamily: 'GratoGrotesk-Bold',
            color: activeColors.text
        },
        font16_bold: {
            fontSize: scaleSize(16),
            lineHeight: scaleSize(24),
            fontWeight: '500',
            fontFamily: 'GratoGrotesk-Bold',
            color: activeColors.text
        },
        font16_card: {
            width: scaleSize(160),
            fontSize: scaleSize(16),
            lineHeight: scaleSize(24),
            marginVertical: scaleSize(12),
            fontWeight: '500',
            fontFamily: 'GratoGrotesk-Bold',
            color: activeColors.text
        },
        font14: {
            fontSize: scaleSize(14),
            fontWeight: '500',
            lineHeight: scaleSize(21),
            fontFamily: 'GratoGrotesk-Bold',
            color: activeColors.textHighlight
        },
        font12: {
            marginTop: scaleSize(4),
            fontWeight: '400',
            fontSize: scaleSize(12),
            lineHeight: scaleSize(18),
            fontFamily: 'GratoGrotesk-Bold',
            color: activeColors.textSub
        },
        font12_sub: {
            fontSize: scaleSize(12),
            fontWeight: '400',
            lineHeight: scaleSize(18),
            fontFamily: 'GratoGrotesk-Bold',
            color: activeColors.textGray
        },
        bestBooksStyle: {
            width: scaleSize(200),
            height: scaleSize(300),
            resizeMode: 'cover',
            backgroundColor: activeColors.cardBackground,
        },
        bookStyle: {
            width: scaleSize(160),
            height: scaleSize(160),
            resizeMode: 'cover',
            backgroundColor: activeColors.cardBackground,
        },
        specialBookCard: {
            flexDirection: 'row',
            marginHorizontal: scaleSize(24),
            padding: scaleSize(12),
            borderRadius: scaleSize(12),
            backgroundColor: activeColors.cardBackground,
        },
        specialBookImage: {
            height: scaleSize(120),
            width: scaleSize(120),
            borderRadius: scaleSize(4),
            backgroundColor: activeColors.cardBackground,
        },
        specialContainer: {
            marginLeft: scaleSize(16),
            justifyContent: 'space-between'
        },
        star_container: {
            flexDirection: 'row',
            marginBottom: scaleSize(8)
        },
        star_box: {
            height: scaleSize(20),
            width: scaleSize(20),
            marginRight: scaleSize(8)
        }
    });

    function navigateBookDetail(bookId: String) {
        //@ts-ignore
        navigation.navigate('BookDetail', { bookId: bookId });
    }
    // Recommended номын жагсаалт 
    const RecommendedList = ({ data, title }: { data: bestBooksData[], title: string }) => {
        return (
            <View>
                <View style={styles.categoryHeader}>
                    <Text style={styles.font16}>{title}</Text>
                    <TouchableOpacity>
                        <Text style={styles.font14}>{'See more'}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    data={data}
                    renderItem={({ item, index }) => <BestBook item={item} index={index} />}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                />
            </View >
        );
    }
    const BestBook = ({ item, index }: { item: bestBooksData, index: number }) => (
        <Image
            key={Math.random()}
            source={{ uri: item.picture_path }}
            style={[styles.bestBooksStyle, {
                marginRight: index == bestBooks.length ? scaleSize(24) : scaleSize(16),
                marginLeft: index == 0 ? scaleSize(24) : 0
            }]}
        />
    );

    // Бусад номнуудын категорын жагсаалт 
    const BookList = ({ data, index }: { data: book, index: number }) => {
        if (data.books.length > 0) {
            return (
                <View>
                    <View style={styles.categoryHeader}>
                        <Text numberOfLines={1} style={styles.font16}>{data.category_name}</Text>
                        <TouchableOpacity>
                            <Text style={styles.font14}>{'See more'}</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        data={data.books}
                        renderItem={({ item, index }) => <Books item={item} index={index} />}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                    />
                </View >
            );
        }
        return null
    }
    const Books = ({ item, index }: { item: bookDetail, index: number }) => {
        const cardStyle = {
            marginRight: index == bestBooks.length ? scaleSize(24) : scaleSize(16),
            marginLeft: index == 0 ? scaleSize(24) : 0
        }
        return (
            <View style={cardStyle}>
                <Image
                    key={Math.random()}
                    source={{ uri: item.picture_path }}
                    style={styles.bookStyle}
                />
                <Text numberOfLines={1} style={styles.font16_card}>{item.name}</Text>
            </View>
        );
    };
    // Special номын  жагсаалт 
    const SpecialBookList = ({ data, title }: { data: specialBookData, title: string }) => {
        return (
            <View >
                <View style={styles.categoryHeader}>
                    <Text numberOfLines={1} style={styles.font16}>{title}</Text>
                </View>
                <TouchableOpacity onPress={() => { navigateBookDetail(data.id) }} style={styles.specialBookCard}>
                    <Image
                        key={Math.random()}
                        source={{ uri: 'https://d36ow7fr399e3e.cloudfront.net/Artboard_1_025df60ec1.jpg' }}
                        style={styles.specialBookImage}
                    />
                    <View style={styles.specialContainer}>
                        <View>
                            <Text style={styles.font16_bold}>{'Бар ээж'}</Text>
                            <Text style={styles.font12}>{'Эми Чуа'}</Text>
                        </View>
                        <View>
                            <View style={styles.star_container}>
                                <StarFill style={styles.star_box} />
                                <StarFill style={styles.star_box} />
                                <StarFill style={styles.star_box} />
                                <StarFill style={styles.star_box} />
                                <StarOutline style={styles.star_box} />
                            </View>
                            <Text style={styles.font12_sub}>{'1,000+ Listeners'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View >
        );
    }
    // Categories жагсаалт 
    const Categories = ({ data, title }: { data: categoriesData[], title: string }) => {
        return (
            <View >
                <View style={styles.categoryHeader}>
                    <Text style={styles.font16}>{title}</Text>
                    <TouchableOpacity>
                        <Text style={styles.font14}>{'See more'}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    data={data}
                    renderItem={({ item, index }) => <CategoryBody item={item} index={index} />}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                />


            </View >
        );
    }
    const CategoryBody = ({ item, index }: { item: categoriesData, index: number }) => {
        const cardStyle = {
            ...styles.categoryBody,
            marginRight: index == bestBooks.length ? scaleSize(24) : scaleSize(16),
            marginLeft: index == 0 ? scaleSize(24) : 0
        }
        return (
            <View style={cardStyle}>
                <Text style={styles.font16_line}>{item.name}</Text>
            </View>
        );
    }
    // Нийт номын категорын жагсаалт 
    const CategoreList = ({ data }: { data: book[], title: string }) => {
        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => <BookList data={item} index={index} />}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.category_id}
                />
            </View >
        );
    }

    return (
        <View style={{ backgroundColor: activeColors.background, flex: 1 }}>
            <Header onPress={() => {
                // @ts-ignore
                navigation.navigate('Settings');
            }} />
            <LoadingScreen isLoading={isLoading} pageName={'HomePage'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Categories title='Categories' data={categories} />
                <RecommendedList data={bestBooks} title={'Recommended For You'} />
                {/* @ts-ignore */}
                <SpecialBookList data={specialBook} title='Special Book' />
                <CategoreList data={categoriesWithBooks} title={'New Releases'} />
            </ScrollView>
        </View>
    );
}

export default HomeScreen;
