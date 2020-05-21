import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import { BottomNavigation } from '../../components/BottomNavigation';
import { Collapse, Input } from '../../components';
import { Container, Content, View } from '../../theme/grid';
import {
  FaqWrapper,
  FaqIntro,
  FaqParagraph,
  FaqSubtitle,
  FaqTitle,
  FaqUppercase,
  Highlight,
  Title,
  SearchWrapper
} from './FaqPage.styled';
import { fetchFaq } from '../../store/actions/externalData';
import SearchIcon from '../../assets/img/icons/lupa.svg';
import Url from '../../components/Url';
import useLoaderContext from '../../hooks/useLoaderContext';

const FaqPage = () => {
  const { faqData, isFetching } = useSelector(
    state => state.externalData
  );
  const { setLoader } = useLoaderContext();
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    if (isFetching) {
      setLoader(true);
      return;
    }
    setLoader(false);
  }, [isFetching, setLoader]);

  useEffect(() => {
    if (!faqData) {
      dispatch(fetchFaq());
    }
  }, [faqData, dispatch]);

  const highlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, key) => {
      const test = part.toLowerCase() === highlight.toLowerCase();
      return test ? <Highlight key={key}>{part}</Highlight> : part;
    });
  };

  const parseUrl = phrases =>
    phrases.map((phrase, index) => {
      const part = phrase.split(/\|/);

      return part.length > 1 ? (
        <Url key={index} value={part[1]}>
          {filterText ? highlightedText(part[0], filterText) : part[0]}
        </Url>
      ) : (
        part
      );
    });

  const renderLine = line => {
    const phrases = line.split(/\[url\]/);

    return parseUrl(phrases);
  };

  const renderElement = (line, index) => {
    switch (line.type) {
      case 'intro': {
        return <FaqIntro key={index}>{line.content.text}</FaqIntro>;
      }
      case 'title': {
        return (
          <FaqTitle key={index} className="title">
            {filterText
              ? highlightedText(line.content.text, filterText)
              : line.content.text}
          </FaqTitle>
        );
      }
      case 'subtitle': {
        return (
          <FaqSubtitle>
            {filterText
              ? highlightedText(line.content.text, filterText)
              : line.content.text}
          </FaqSubtitle>
        );
      }
      case 'paragraph_strong': {
        return (
          <FaqUppercase key={index}>
            {filterText
              ? highlightedText(line.content.text, filterText)
              : line.content.text}
          </FaqUppercase>
        );
      }
      case 'paragraph': {
        return (
          <FaqParagraph key={index}>
            {renderLine(line.content.text)}
          </FaqParagraph>
        );
      }
      case 'details': {
        const title = filterText
          ? highlightedText(line.content.text, filterText)
          : line.content.text;
        const details = renderLine(line.content.reply);
        return (
          <Collapse
            key={index}
            title={title}
            className="collapse"
            forceOpen={filterText.length >= '3'}
          >
            {details}
          </Collapse>
        );
      }
      default:
        return null;
    }
  };
  const getFilteredElements = elements =>
    elements.filter(
      line =>
        line.content.text.toLocaleLowerCase().includes(filterText) ||
        line.content.reply.toLocaleLowerCase().includes(filterText)
    );
  const handleChangeInput = e => {
    const { value } = e.target;
    setFilterText(value.toLocaleLowerCase());
  };

  const handleResetInput = () => {
    setFilterText('');
  };

  if (!faqData) {
    return null;
  }

  const { watermark, elements = [] } = faqData;

  const elementsToDisplay =
    filterText.length >= '3' ? getFilteredElements(elements) : elements;
  return (
    <View>
      <Header hideBackButton />
      <Content>
        <Container className="full-height">
          <Title>Pytania i odpowiedzi</Title>
          <FaqWrapper>
            {elements
              .filter(line => line.type === 'intro')
              .map((line, index) => renderElement(line, index))}
            <SearchWrapper>
              <Input
                reset={handleResetInput}
                icon={SearchIcon}
                type="text"
                name="search"
                placeholder="Szukaj wśród pytań"
                value={filterText}
                onChange={handleChangeInput}
              />
            </SearchWrapper>
            {elementsToDisplay
              .filter(line => line.type !== 'intro')
              .map((line, index) => renderElement(line, index))}
            <p className="watermark details">{watermark}</p>
          </FaqWrapper>
        </Container>
        <BottomNavigation />
      </Content>
    </View>
  );
};

export default FaqPage;
