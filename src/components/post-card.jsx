import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as s from "../styles/";
import Card from "../components/card";

const Date = styled.div`
  color: ${s.gray};
  font-size: ${s.fontSize6};
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: ${s.tracked};
`;

const Title = styled.h3`
  font-size: ${s.fontSize5};
  margin-top: ${s.spacing1};
  margin-bottom: ${s.spacing3};
  font-weight: 400;
  max-width: ${s.measure};
  flex: 1;
`;

const Text = styled.div`
  padding: ${s.spacing3} ${s.spacing1};
`;

const Image = styled.img`
  border: 1px solid ${s.lightGray};
`;

const PostCard = props => (
  <Card to={props.to} className={props.className}>
    <Image
      alt={props.image.alt}
      src={props.image.src}
      srcSet={props.image.srcSet}
      sizes={props.image.sizes}
    />
    <Text>
      <Title>{props.children}</Title>
      <Date>{props.date}</Date>
    </Text>
  </Card>
);

PostCard.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  image: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
    sizes: PropTypes.string
  }),
  /**
   * Title of the post
   */
  children: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

PostCard.defaultProps = {
  className: null,
  image: null
};

export default PostCard;
