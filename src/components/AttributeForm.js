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



    const [protein, setProtein] = useState(0)
    const [fat, setFat] = useState(0)
    const [carbs, setCarbs] = useState(0)
    const [calories, setCalories] = useState(0)

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

        } else {
            maleCalorieNeed()
            console.log(maleCalorieNeed())
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
        const femaleGoalCalories = []
        const femaleProtein = []
        const femaleFat = []
        const femaleCarbs = []
        const remainingCals = []
        
        
        

        // Calculates TDEE(Movement Expedenture) based on activity level
        if (form.activity === "Sedentary: little or no excercise") {
            femaleGoalCalories.push(Math.round(sedentaryTDEE))
            setCalories(femaleGoalCalories[0])
        } else if (form.activity === "Light Activity: excercise 1-3 times/week") {
            femaleGoalCalories.push(Math.round(lightActTDEE))
            setCalories(femaleGoalCalories[0])
        } else if (form.activity === "Moderate Activity: excercise 4-5 times/week") {
            femaleGoalCalories.push(Math.round(moderateActTDEE))
            setCalories(femaleGoalCalories[0])
        } else {
            femaleGoalCalories.push(Math.round(veryActiveTDEE))
            setCalories(femaleGoalCalories[0])
        }


        // Calculates estimated calorie need based on goals
        if (form.goal === "Maintain Weight") {
            // protein macros
            const proteinIntake = form.weight * .8
            const proteinCal = proteinIntake * 4
            let calories = femaleGoalCalories[0] - proteinCal
            remainingCals.push(calories)
            femaleProtein.push(Math.round(proteinIntake))
            setProtein(femaleProtein[0])
        


            // fats macros
            const fatCal = femaleGoalCalories[0] * .25
            const fatIntake = fatCal / 9
            calories = remainingCals[0] - fatCal
            remainingCals.pop()
            remainingCals.push(calories)
            femaleFat.push(Math.round(fatIntake))
            setFat(femaleFat[0])
            

            // female carbs
            const carbIntake = remainingCals[0] / 4
            femaleCarbs.push(Math.round(carbIntake))
            setCarbs(femaleCarbs[0])

            

            return {Calories: femaleGoalCalories[0] + " calories", Protein: femaleProtein[0] + " grams of proteins", Carbs: femaleCarbs[0] + " grams of carbs", Fats: femaleFat[0] + " grams of fat"}

        } else if (form.goal === "Lose Weight") {
            const loseWeight = femaleGoalCalories[0] - (femaleGoalCalories[0] * .20)

             // protein macros
             const proteinIntake = form.weight * .8
             const proteinCal = proteinIntake * 4
             let calories = femaleGoalCalories[0] - proteinCal
             remainingCals.push(calories)
             femaleProtein.push(Math.round(proteinIntake))
             setProtein(femaleProtein[0])
 
 
             // fats macros
             const fatCal = loseWeight * .25
             const fatIntake = fatCal / 9
             calories = remainingCals[0] - fatCal
             remainingCals.pop()
             remainingCals.push(calories)
             femaleFat.push(Math.round(fatIntake))
             setFat(femaleFat[0])
 
             // female carbs
             const carbIntake = remainingCals[0] / 4
             femaleCarbs.push(Math.round(carbIntake))
             setCarbs(femaleCarbs[0])

            return {Calories: Math.round(loseWeight) + " calories", Protein: femaleProtein[0] + " grams of proteins", Carbs: femaleCarbs[0] + " grams of carbs", Fats: femaleFat[0] + " grams of fats"}

        } else if (form.goal === "Build Muscle") {

            const buildMuscle = femaleGoalCalories[0] + (femaleGoalCalories[0] * .20)
             // protein macros
             const proteinIntake = form.weight * 1
             const proteinCal = proteinIntake * 4
             let calories = femaleGoalCalories[0] - proteinCal
             remainingCals.push(calories)
             femaleProtein.push(Math.round(proteinIntake))
             setProtein(femaleProtein[0])
 
 
             // fats macros
             const fatCal = buildMuscle * .25
             const fatIntake = fatCal / 9
             calories = remainingCals[0] - fatCal
             remainingCals.pop()
             remainingCals.push(calories)
             femaleFat.push(Math.round(fatIntake))
             setFat(femaleFat[0])
 
             // female carbs
             const carbIntake = remainingCals[0] / 4
             femaleCarbs.push(Math.round(carbIntake))
             setCarbs(femaleCarbs[0])

            return {Calories: Math.round(buildMuscle) + " calories", Protein: femaleProtein[0] + " grams of proteins", Carbs: femaleCarbs[0] + " grams of carbs", Fats: femaleFat[0] + " grams of fats"}
        }
    }

    // Calculations for males
    const maleCalorieNeed = () => {
        const lbToKg = parseInt(form.weight) * 0.45359237
        const inToCm = parseInt(form.height) * 2.54

        // calculates REE (Resting Energy Expedenture) for males
        const REE = 10 * lbToKg + 6.25 * parseInt(inToCm) - 5 * parseInt(form.age) + 5

        // calculates TDEE based on activity level
        const sedentaryTDEE = REE * 1.2
        const lightActTDEE = REE * 1.375
        const moderateActTDEE = REE * 1.55
        const veryActiveTDEE = REE * 1.725

        // Arrays that stores the calculated data for calories and macros
        const maleGoalCalories = []
        const maleProtein = []
        const maleFat = []
        const maleCarbs = []
        const remainingCals = []

        // Calculates TDEE(Movement Expedenture) based on activity level
        if (form.activity === "Sedentary: little or no excercise") {
            maleGoalCalories.push(Math.round(sedentaryTDEE))
            setCalories(maleGoalCalories[0])
        } else if (form.activity === "Light Activity: excercise 1-3 times/week") {
            maleGoalCalories.push(Math.round(lightActTDEE))
            setCalories(maleGoalCalories[0])
        } else if (form.activity === "Moderate Activity: excercise 4-5 times/week") {
            maleGoalCalories.push(Math.round(moderateActTDEE))
            setCalories(maleGoalCalories[0])
        } else {
            maleGoalCalories.push(Math.round(veryActiveTDEE))
            setCalories(maleGoalCalories[0])
        }


        // Calculates estimated calorie need based on goals
        if (form.goal === "Maintain Weight") {

            // protein Macros
            const proteinIntake = form.weight * .8
            const proteinCal = proteinIntake * 4
            let calories = maleGoalCalories[0] - proteinCal
            remainingCals.push(calories)
            maleProtein.push(Math.round(proteinIntake))
            setProtein(maleProtein[0])

            // fats Macros
            const fatCal = maleGoalCalories[0] * .25
            const fatIntake = fatCal / 9
            calories = remainingCals[0] - fatCal
            remainingCals.pop()
            remainingCals.push(calories)
            maleFat.push(Math.round(fatIntake))
            setFat(maleFat[0])

            // carb macros
            const carbIntake = remainingCals[0] / 4
            maleCarbs.push(Math.round(carbIntake))
            setCarbs(maleCarbs[0])

            return {Calories: maleGoalCalories[0] + " calories", Protein: maleProtein[0] + " grams of proteins", Carbs: maleCarbs[0] + " grams of carbs", Fats: maleFat[0] + " grams of fat"}

        } else if (form.goal === "Lose Weight") {
            const loseWeight = maleGoalCalories[0] - (maleGoalCalories[0] * .20)
            
            // Protein macros
            const proteinIntake = form.weight * .8
            const proteinCal = proteinIntake * 4
            let calories = maleGoalCalories[0] - proteinCal
            remainingCals.push(calories)
            maleProtein.push(Math.round(proteinIntake))
            setProtein(maleProtein[0])

            // fats macros
            const fatCal = loseWeight * .25
            const fatIntake = fatCal / 9
            calories = remainingCals[0] - fatCal
            remainingCals.pop()
            remainingCals.push(calories)
            maleFat.push(Math.round(fatIntake))
            setFat(maleFat[0])

            // carbs macros
            const carbIntake = remainingCals[0] / 4
            maleCarbs.push(Math.round(carbIntake))
            setCarbs(maleCarbs[0])

            return {Calories: loseWeight + " calories", Protein: maleProtein[0] + " grams of proteins", Carbs: maleCarbs[0] + " grams of carbs", Fats: maleFat[0] + " grams of fat"}

        } else if (form.goal === "Build Muscle") {

            const buildMuscle = maleGoalCalories[0] + (maleGoalCalories[0] * .20)

            // protein macros
            const proteinIntake = form.weight * .83
            const proteinCal = proteinIntake * 4
            let calories = maleGoalCalories[0] - proteinCal
            remainingCals.push(calories)
            maleProtein.push(Math.round(proteinIntake))
            setProtein(maleProtein[0])

            // fats macros
            const fatCal = buildMuscle * .25
            const fatIntake = fatCal / 9
            calories = remainingCals[0] - fatCal
            remainingCals.pop()
            remainingCals.push(calories)
            maleFat.push(Math.round(fatIntake))
            setFat(maleFat[0])

            // female carbs
            const carbIntake = remainingCals[0] / 4
            maleCarbs.push(Math.round(carbIntake))
            setCarbs(maleCarbs[0])

            return {Test: console.log(fatCal), Calories: Math.round(buildMuscle) + " calories", Protein: maleProtein[0] + " grams of proteins", Carbs: maleCarbs[0] + " grams of carbs", Fats: maleFat[0] + " grams of fats"}
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