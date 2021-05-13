import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import './AttributeForm.css'

const AttributeForm = () => {

    const [form, setForm] = useState({
        age: '',
        gender: '',
        height: '',
        weight: '',
        activity: '',
        goal: ''
    })

    const [macros, setMacros] = useState({
        protein: '',
        carbs: '',
        fat: ''
    })
    


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        // console.log(form)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (form.gender === "Female") {
            femaleCalorieNeed()
            console.log(femaleCalorieNeed())
        } 
    }

    // Calculations for Females
    const femaleCalorieNeed = () => {
        const lbToKg = parseInt(form.weight) * 0.45359237
        const inToCm = parseInt(form.height) * 2.54

        // calculates REE (Resting Energy Expedenture) for females
        const REE = 10 * lbToKg + 6.25 * parseInt(inToCm) - 5 * parseInt(form.age) - 161

        // calculates TDEE based on activity level
        const sedentaryTDEE = REE * 1.2
        const lightActTDEE = REE * 1.375
        const moderateActTDEE = REE * 1.55
        const veryActiveTDEE = REE * 1.725

        // Arrays that stores the calculated data for calories and macros
        const goalCalories = []
        const protein = []
        const fat = []
        const carbs = []

        // Calculates TDEE(Movement Expedenture) based on activity level
        if (form.activity === "Sedentary: little or no excercise") {
            goalCalories.push(sedentaryTDEE)
        } else if (form.activity === "Light Activity: excercise 1-3 times/week") {
            goalCalories.push(lightActTDEE)
        } else if (form.activity === "Moderate Activity: excercise 4-5 times/week") {
            goalCalories.push(moderateActTDEE)
        } else {
            goalCalories.push(veryActiveTDEE)
        }


        // Calculates estimated calorie need based on goals
        if (form.goal === "Maintain Weight") {
            return goalCalories[0] + " calories"
        } else if (form.goal === "Lose Weight") {
            const loseWeight = goalCalories[0] - (goalCalories[0] * .20)
            // const proteinIntake = form.weight * .8
            // protein.push(proteinIntake)
            return loseWeight + " calories"
        } else if (form.goal === "Build Muscle") {
            const buildMuscle = goalCalories[0] + (goalCalories[0] * .20)
            return buildMuscle + " calories"
        }
    }


    

    return (
        <div className="container">
            <Form className="form" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label className="form-label">Age</Form.Label>
                    <Form.Control onChange={handleChange} value={form.age} type="number" name="age" placeholder="age" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="form-label">Gender</Form.Label>
                    <Form.Control onChange={handleChange} value={form.gender} name="gender" as="select">
                        <option disabled>Choose One</option>
                        <option>Male</option>
                        <option>Female</option>
                </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="form-label">Height (in.)</Form.Label>
                    <Form.Control onChange={handleChange} value={form.height} type="number" name="height" placeholder="Height" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="form-label">Weight (lbs)</Form.Label>
                    <Form.Control onChange={handleChange} value={form.weight} type="number" name="weight" placeholder="Weight" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="form-label">Activity Level</Form.Label>
                    <Form.Control onChange={handleChange} value={form.activity} name="activity" as="select">
                        <option disabled>Choose One</option>
                        <option>Sedentary: little or no excercise</option>
                        <option>Light Activity: excercise 1-3 times/week</option>
                        <option>Moderate Activity: excercise 4-5 times/week</option>
                        <option>Very Active: intense excercise 6-7 times/week</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="form-label">Your Goal</Form.Label>
                    <Form.Control onChange={handleChange} value={form.goal} name="goal" as="select">
                        <option disabled>Choose One</option>
                        <option>Maintain Weight</option>
                        <option>Lose Weight</option>
                        <option>Build Muscle</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="button" variant="primary">Get my Macros</Button>
            </Form>
        </div>
    )
}

export default AttributeForm