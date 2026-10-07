// Which courses this learner owns, used to decide whether to suggest buying the next course.
// Development preview: checkout is not open, so nothing is owned and every next course is suggested.
// In production, replace ownedCourseIds() with the learner's course grants from the server
// (kind=course, status=purchased — see docs/production-access.md). 'all' means the Full Pathway.
export const COURSE_ACCESS_KEY='mm.course-access.v1';
export const ownedCourseIds=(storage=globalThis.localStorage)=>{try{const value=JSON.parse(storage?.getItem(COURSE_ACCESS_KEY)||'[]');return Array.isArray(value)?value.map(String):[];}catch{return [];}};
export const ownsCourse=(id,storage)=>{const owned=ownedCourseIds(storage);return owned.includes('all')||owned.includes(id);};
