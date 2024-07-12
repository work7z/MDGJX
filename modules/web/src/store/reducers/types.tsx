export type NodeCode = "qna" | "exams" | "grammar" | "pure-english"
export type TopicNodes = {
    id: number, // unique
    label: string,
    code: NodeCode,
    description: string,
}   
export type CreationOptional<T> = T | null;
// topic model
export class Topic{
    declare id?: number;
    declare subject: string; // title
    declare content: string; // markdown
    declare nodeId: number; // node can be hard code
    declare userId: number; // author
    declare agreeCount: number;
    declare commentCount: number;
    declare disagreeCount: number;
    declare status: number; // 0->normal, 1->deleted, 2->waiting for approval
    declare approved: number; // 0->not approved, 1->approved
    declare appendContentArr: string; // json format array
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

// topic comment model
export class TopicComment {
    declare id?: number;
    declare topicId: number;
    declare userId: number;
    declare agreeCount: number;
    declare disagreeCount: number;
    declare replyTo: number; // reply to comment id
    declare content: string; // markdown
    declare approved: number; // 0->not approved, 1->approved
    declare status: number; // 0->normal, 1->deleted, 2->waiting for approval
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

export type FoundWithRes<T> = {
    found: boolean;
    value: T;
};

export type TopicDetail = {
    topic: Topic;
    comments: TopicComment[];
};

export type FindPwReq = {
    email: string;
    password: string;
    confirmPassword: string;
};
export type TellMeVCode4FindPwReq = {
    email: string;
    vcode: string;
};
export type TellMeVCodeRes = {
    verified: boolean;
};
export type FindPwRes = {
    data: {};
};

export class NewStarDict {
    declare id: string; // 单词作为id(code)，不允许修改
    declare sw: string;
    declare phonetic: string; // 英式发音
    declare phonetic_us: string; // 美式发音
    declare chineseTranslation: string; // 中文释义
    declare englishTranslation: string; // 英文释义
    declare helpToRemember: string; // 记忆方法
    declare chineseExample: string; // 中文例句
    declare englishExample: string; // 英文例句
    declare pos: string;
    declare collins: number;
    declare oxford: number;
    declare tag: string;
    declare bnc: number;
    declare frq: number;
    declare exchange: string;
}
