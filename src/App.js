import React, {useState, useEffect} from "react";
import styled from "styled-components"
import GlobalStyle from "./theme/globalStyle"
import {nanoid} from "nanoid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Formik, useField, Field, Form} from "formik";
import * as Yup from "yup"

    const MainDiv = styled.main`
    min-height: 100vh;
    background-color: rgba(25,25,25,255);
    color: white;
    `
    const MovieUl = styled.ul`
    list-style: none;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    `
    const Movie = styled.li`
    padding:1em;
    `
    const MovieButton = styled.button`
    display: flex;
    cursor: pointer;
    position: fixed;
    right: 0;
    bottom: 0;
    border: none;
    height: 4rem;
    width: 4rem;
    margin: 2em;
    border-radius: 50%;
    padding: 0.5em;
    background-color: black;
    color: white;
    &: hover {
        background-color: white;
        color: black;
    }
    `
    const PopUpBackground = styled.div`
    display: ${props => props.toggled?"flex":"none"};
    position: fixed;
    background-color: rgb(0,0,0,0.4);
    width: 100%;
    height: 100%;
    z-index: 2;
    left: 0;
    top: 0;
    `
    const PopUp = styled.div`
    display: flex;
    height: 50%;
    width: 50%;
    background: black;
    margin: auto auto;
    flex-direction: column;
    `
    const StyledIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    width: 32px;
    height: 32px;
    padding: 1em;
    color: white;
    margin-left: auto;
    `
    const StyledForm = styled(Form)`
    height: 100%;
    width: 100%;
    color: white;
    `
    const MainWrapper = styled.div`
    display: flex;
    width: 50%;
    height: 100%;
    margin: 0 auto;
    flex-direction: column;
    justify-content: space-around;
    `
    const Wrapper = styled.div`
    display: flex;
    `
    const RadioGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    `
    const RadioWrapper = styled.div`
    display: flex;
    flex-direction: column;
    `
    const FormRadioInput = styled.input`
    cursor: pointer;
    margin: 0 1em 0 0;
    border: 0.2rem solid #fff;
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    color: red;
    `
    const FormInput = styled.input`
    border-radius: 5px;
    font-size: 1.25rem;
    padding: 0.5em;
    border: none;
    width: 100%;
    font-family: inherit;
    &:focus {
        outline: inherit;
    }
    `
    const FormError = styled.div`
    font-size: 1.15rem;
    font-family: inherit;
    color: red;
    position: absolute;
    z-index: 5;
    `
    const FormLabel = styled.label`
    font-family: inherit;
    font-size: 1.125rem;
    `
    const TextArea = styled(Field)`
    font-size: 1.15rem;
    font-family: inherit;
    resize: none;
    padding: 0.5em;
    border: none;
    width: 100%;
    outline: none;
    border-radius: 5px;
    `
    const Submit = styled.button`
    border: none;
    border-radius: 5px;
    font-size: 1.15rem;
    margin: 0;
    width: 100%;
    padding: 0.5em;
    `
    const MovieDiv = styled.div`
    width: 100%;
    display: grid;
    grid-template-areas:
    "picture name comment trash"
    "picture verdict comment trash";
    color: white;
    background-color: rgba(32,32,32,255);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    `
    const MovieNameText = styled.h2`
    margin: 1em 0 1em 1em;
    font-size: 1.25rem;
    grid-area: name;
    font-weight: 600;
    `
    const MovieCommentText = styled.p`
    margin: 1em 0;
    font-size: 1rem;
    grid-area: comment;
    `
    const MovieVerdictText = styled.h3`
    margin: 0 0 1em 1em;
    font-size: 1.25rem;
    font-weight: 300;
    grid-area: verdict;
    `
    const MovieImage = styled.img`
    height: 150px;
    width: 200px;
    grid-area: picture;
    object-fit: cover;
    `
export default function App () {
    const [storedMovies, setStoredMovies]  = useState(JSON.parse(localStorage.getItem("movies")))
    if (storedMovies == null) {
        setStoredMovies([])
    }
    useEffect(() => {
    }, [storedMovies])
    const movieArr = storedMovies.map((movie, index) => {
        return <Movie key={nanoid()}>
            <MovieDiv>
                <MovieImage src={String(movie.imageLink)}/>
                <MovieNameText>{movie.name}</MovieNameText>
                <MovieVerdictText>{movie.verdict}</MovieVerdictText>
                <MovieCommentText>{movie.comment}</MovieCommentText>
                <StyledIcon icon={faTrash} style={{width: "15px", height: "15px", gridArea: "trash"}} onClick={() => {
                    storedMovies.pop(index)
                    localStorage.setItem("movies", JSON.stringify(storedMovies))
                    setStoredMovies(JSON.parse(localStorage.getItem("movies")))
                }}/>
            </MovieDiv>
        </Movie>
    });
    const FormInputF = ({label, ...props}) => {
        const [field, meta] = useField(props)
        return (
            <Wrapper>
                <FormInput {...field} {...props}/>
                {meta.touched && meta.error?(
                    <FormError>{meta.error}</FormError>
                ):null}
            </Wrapper>
        )
    }
    const FormAreaInputF = ({label, ...props}) => {
        const [field, meta] = useField(props)
        return (
            <Wrapper>
                <TextArea {...field} {...props}/>
                {meta.touched && meta.error?(
                    <FormError>{meta.error}</FormError>
                ):null}
            </Wrapper>
        )
    }
    const FormInputRadioF = ({label, ...props}) => {
        const [field, meta] = useField(props)
        return (
            <RadioWrapper style={{flexDirection: "row"}}>
                <FormRadioInput {...field} {...props}/>
                {meta.touched && meta.error?(
                    <FormError>{meta.error}</FormError>
                ):null}
                <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            </RadioWrapper>
        )
    }
    const [popUpToggle, setPopUpToggle] = useState(false)
    return (
        <MainDiv>
            <GlobalStyle/>
            <MovieUl>
                {movieArr}
            </MovieUl>
            <PopUpBackground toggled={popUpToggle}>
                <PopUp>
                    <StyledIcon icon={faX} onClick={() => setPopUpToggle(!popUpToggle)}/>
                    <Formik initialValues={{name:"", comment:"", verdict:"", imageLink: ""}}
                    validationSchema={Yup.object({
                        name: Yup.string().max(30, ">30").required("*"),
                        comment: Yup.string().max(100, ">100").required("*"),
                        verdict: Yup.string().required("*"),
                        imageLink: Yup.string().required("*")
                    })}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        const newMovieArr =
                            {
                                "name": values.name,
                                "comment": values.comment,
                                "verdict": values.verdict,
                                "imageLink": values.imageLink
                            }
                        storedMovies.push(newMovieArr)
                        localStorage.setItem("movies", JSON.stringify(storedMovies))
                        resetForm({values: ""})
                        setSubmitting(false)
                        setPopUpToggle(!popUpToggle)
                    }}>
                        {({values}) => (
                            <StyledForm>
                                <MainWrapper>
                                    <FormInputF
                                        label = "Movie name"
                                        name = "name"
                                        type = "text"
                                        placeholder = "Movie Name"
                                    />
                                    <FormInputF
                                        label = "Link to Image"
                                        name = "imageLink"
                                        type = "text"
                                        placeholder = "Link to Image"
                                    />
                                    <FormAreaInputF
                                        as = "textarea"
                                        label = "Comment"
                                        name = "comment"
                                        placeholder = "Comment"
                                    />
                                    <RadioGroupWrapper>
                                        <FormInputRadioF
                                        label = "amazing"
                                        name = "verdict"
                                        type = "radio"
                                        value = "amazing"
                                        />
                                        <FormInputRadioF
                                        label = "mid"
                                        name = "verdict"
                                        type = "radio"
                                        value = "mid"
                                        />
                                        <FormInputRadioF
                                        label = "boring"
                                        name = "verdict"
                                        type = "radio"
                                        value = "boring"
                                        />
                                        <FormInputRadioF
                                        label = "could not even finish"
                                        name = "verdict"
                                        type = "radio"
                                        value = "could not even finish"
                                        />
                                    </RadioGroupWrapper>
                                    <Submit type="submit">Submit</Submit>
                                </MainWrapper>
                            </StyledForm>
                        )}
                    </Formik>
                </PopUp>
            </PopUpBackground>
            <MovieButton onClick={() => setPopUpToggle(!popUpToggle)}>
                <StyledIcon icon={faPlus} style={{margin: "auto auto", padding: "0", color: "inherit"}}/>
            </MovieButton>
        </MainDiv>
    )
}
/*
https://medium.com/@daniela.sandoval/creating-a-popup-window-using-js-and-react-4c4bd125da57
    useEffect(() => {
        const movieArr = [
            {
                name: "epic movie",
                comment: "epic comment"
            },
            {
                name: "epic movie 2",
                comment: "epic comment 2"
            }
        ]
        localStorage.setItem("movies", JSON.stringify(movieArr))
    })
*/