import { useState } from "react"
import { useParams } from "react-router-dom";
import NavBar from "../pages/NavBar";
import styled from "styled-components";

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ProfileHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ProfileBio = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const FavoriteShowsHeading = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FavoriteShowsList = styled.ul`
  list-style-type:none;
  padding: 0;
  margin: 0;
  li {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const ReviewSection = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
`;

const ReviewHeading = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ReviewInput = styled.textarea`
  width: 100%;
  height: 100px;
  resize: auto;
  padding: auto;
  border: 1px solid #ccc;
`;

const SubmitReviewButton = styled.button`
  background-color: #f6052d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;




export default function UserProfile() {
  const { username } = useParams;

  return (
    <>
      <UserProfileContainer>
        <NavBar/>
        <ProfileHeader>{username}'s Profile</ProfileHeader>
        <ProfilePicture src="avatar.jpg" alt="Profile Picture" />
        <ProfileBio>Bio: Hello World</ProfileBio>
        <FavoriteShowsHeading>Favorite Shows</FavoriteShowsHeading>
        <FavoriteShowsList>
          <li>Show 1</li>
          <li>Show 2</li>
          <li>Show 3</li>
        </FavoriteShowsList>

        <ReviewHeading>Leave a review here:</ReviewHeading>
        <ReviewSection><ReviewInput /></ReviewSection>
        <SubmitReviewButton>Submit</SubmitReviewButton>
      </UserProfileContainer>
    </>
  );
}
