import mongoose, { modelNames } from 'mongoose';

/**
 * -job desc schema : String
 * -resume text : String
 * -self desc : String
 * 
 * -matchScore: { Number }
 * 
 * -tech qns : [{ qn: "", intention: "", ans: ""  }]
 * -behavior qn: [{ qn: "", intention: "", ans: ""  }]
 * -skill gaps: [{ skill: "", severity: { type: String, enum: ["low","medium","high"]} }]
 * -preparation plan: [{ day:Number, focus: String, tasks: [ String ] }]
 */


const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Tech qn is reqd"]
    },
    intention:{
        type:String,
        required:[true,"Intention is reqd"]
    },
    answer:{
        type:String,
        required:[true,"Answer is reqd"]
    }
},{
    _id:false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Tech qn is reqd"]
    },
    intention:{
        type:String,
        required:[true,"Intention is reqd"]
    },
    answer:{
        type:String,
        required:[true,"Answer is reqd"]
    }
},{
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum: ["low","medium","high"],
        required:[true,"Severity is reqd"]
    }
},{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is reqd"]
    },
    focus:{
        type:String,
        required:[true,"Focus is reqd"]
    },
    tasks:[{
        type:String,
        required:[true,"Task is reqd"]
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required: [true,"Job description is reqd"]
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{
    timestamps:true
})

const interviewReportModel = mongoose.model('InterviewReport',interviewReportSchema);
export default interviewReportModel;