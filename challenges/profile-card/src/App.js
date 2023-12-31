import React from 'react';
import './index.css'

const skills = [
    {
        skill: "HTML+CSS",
        level: "intermediate",
        color: "#4278f8"
    },
    {
        skill: "JavaScript",
        level: "advanced",
        color: "#EFD81D"
    },
    {
        skill: "Web Design",
        level: "beginner",
        color: "#C3DCAF"
    },
    {
        skill: "Git and GitHub",
        level: "intermediate",
        color: "#E84F33"
    },
    {
        skill: "React",
        level: "advanced",
        color: "#60DAFB"
    },
    {
        skill: "Angular",
        level: "beginner",
        color: "#c413d3"
    }
];

const App = () => {
    return (
        <div className={'card'}>
            <Avatar/>
            <div className="data">
                <Intro/>
                <SkillList/>
            </div>
        </div>
    )
}

const Avatar = () => {
    return (
        <img className={'avatar'} src="avatar.png" alt="avatar"/>
    )
}
const Intro = () => {
    return (
        <div>
            <h1>Yaroslav Kit</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque cupiditate
                delectus dicta dolor.</p>
        </div>
    )
}
const SkillList = () => {
    return (
        <div className={'skill-list'}>
            {skills.map(skill => <Skill skill={skill.skill} level={skill.level} backgroundColor={skill.color}/>)}
        </div>
    )
}
const Skill = ({skill, level, backgroundColor}) => {
    return (
        <div style={{backgroundColor}} className={'skill'}>
            <span>{skill}</span>
            <span>{(level === 'beginner' && '👶') || (level === 'intermediate' && '👍') || '💪'}</span>
        </div>
    )
}

export default App;
