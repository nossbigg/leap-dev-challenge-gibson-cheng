// we need this so that the response from the GPT will have at least 3 points, and that it can be processed by the system
export const PROMPT_3_POINT_AND_SPACER_FORMATTER = `

Structure your response in 3 points at most, with each point delimited by a paragraph and a <SPACER> tag
`;
