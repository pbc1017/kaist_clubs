var DataTypes = require("sequelize").DataTypes;
var _Activity = require("./Activity");
var _ActivityEvidence = require("./ActivityEvidence");
var _ActivityMember = require("./ActivityMember");
var _ActivityType = require("./ActivityType");
var _Agenda = require("./Agenda");
var _AgendaType = require("./AgendaType");
var _Attendance = require("./Attendance");
var _AttendanceType = require("./AttendanceType");
var _CafeNotice = require("./CafeNotice");
var _Club = require("./Club");
var _ClubBuilding = require("./ClubBuilding");
var _ClubRepresentative = require("./ClubRepresentative");
var _ClubRepresentativeType = require("./ClubRepresentativeType");
var _Division = require("./Division");
var _DivisionGroup = require("./DivisionGroup");
var _DivisionPresident = require("./DivisionPresident");
var _ExecutiveMember = require("./ExecutiveMember");
var _Fixture = require("./Fixture");
var _Funding = require("./Funding");
var _Meeting = require("./Meeting");
var _MeetingMemberType = require("./MeetingMemberType");
var _MeetingType = require("./MeetingType");
var _Member = require("./Member");
var _MemberClub = require("./MemberClub");
var _MemberStatus = require("./MemberStatus");
var _PermanentClub = require("./PermanentClub");
var _Semester = require("./Semester");
var _SemesterClub = require("./SemesterClub");
var _SemesterClubType = require("./SemesterClubType");
var _Warning = require("./Warning");
var _sessions = require("./sessions");

function initModels(sequelize) {
  var Activity = _Activity(sequelize, DataTypes);
  var ActivityEvidence = _ActivityEvidence(sequelize, DataTypes);
  var ActivityMember = _ActivityMember(sequelize, DataTypes);
  var ActivityType = _ActivityType(sequelize, DataTypes);
  var Agenda = _Agenda(sequelize, DataTypes);
  var AgendaType = _AgendaType(sequelize, DataTypes);
  var Attendance = _Attendance(sequelize, DataTypes);
  var AttendanceType = _AttendanceType(sequelize, DataTypes);
  var CafeNotice = _CafeNotice(sequelize, DataTypes);
  var Club = _Club(sequelize, DataTypes);
  var ClubBuilding = _ClubBuilding(sequelize, DataTypes);
  var ClubRepresentative = _ClubRepresentative(sequelize, DataTypes);
  var ClubRepresentativeType = _ClubRepresentativeType(sequelize, DataTypes);
  var Division = _Division(sequelize, DataTypes);
  var DivisionGroup = _DivisionGroup(sequelize, DataTypes);
  var DivisionPresident = _DivisionPresident(sequelize, DataTypes);
  var ExecutiveMember = _ExecutiveMember(sequelize, DataTypes);
  var Fixture = _Fixture(sequelize, DataTypes);
  var Funding = _Funding(sequelize, DataTypes);
  var Meeting = _Meeting(sequelize, DataTypes);
  var MeetingMemberType = _MeetingMemberType(sequelize, DataTypes);
  var MeetingType = _MeetingType(sequelize, DataTypes);
  var Member = _Member(sequelize, DataTypes);
  var MemberClub = _MemberClub(sequelize, DataTypes);
  var MemberStatus = _MemberStatus(sequelize, DataTypes);
  var PermanentClub = _PermanentClub(sequelize, DataTypes);
  var Semester = _Semester(sequelize, DataTypes);
  var SemesterClub = _SemesterClub(sequelize, DataTypes);
  var SemesterClubType = _SemesterClubType(sequelize, DataTypes);
  var Warning = _Warning(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);

  Club.belongsToMany(Semester, { as: 'semester_id_Semester_SemesterClubs', through: SemesterClub, foreignKey: "club_id", otherKey: "semester_id" });
  Member.belongsToMany(Semester, { as: 'semester_id_Semesters', through: MemberStatus, foreignKey: "student_id", otherKey: "semester_id" });
  Semester.belongsToMany(Club, { as: 'club_id_Clubs', through: SemesterClub, foreignKey: "semester_id", otherKey: "club_id" });
  Semester.belongsToMany(Member, { as: 'student_id_Members', through: MemberStatus, foreignKey: "semester_id", otherKey: "student_id" });
  Attendance.belongsTo(Club, { as: "fromClub", foreignKey: "fromClubId"});
  Club.hasMany(Attendance, { as: "Attendances", foreignKey: "fromClubId"});
  ClubRepresentative.belongsTo(Club, { as: "club", foreignKey: "club_id"});
  Club.hasMany(ClubRepresentative, { as: "ClubRepresentatives", foreignKey: "club_id"});
  Fixture.belongsTo(Club, { as: "club", foreignKey: "club_id"});
  Club.hasMany(Fixture, { as: "Fixtures", foreignKey: "club_id"});
  MemberClub.belongsTo(Club, { as: "club", foreignKey: "club_id"});
  Club.hasMany(MemberClub, { as: "MemberClubs", foreignKey: "club_id"});
  PermanentClub.belongsTo(Club, { as: "club", foreignKey: "club_id"});
  Club.hasOne(PermanentClub, { as: "PermanentClub", foreignKey: "club_id"});
  SemesterClub.belongsTo(Club, { as: "club", foreignKey: "club_id"});
  Club.hasMany(SemesterClub, { as: "SemesterClubs", foreignKey: "club_id"});
  Warning.belongsTo(Club, { as: "club", foreignKey: "club_id"});
  Club.hasMany(Warning, { as: "Warnings", foreignKey: "club_id"});
  Club.belongsTo(ClubBuilding, { as: "building", foreignKey: "building_id"});
  ClubBuilding.hasMany(Club, { as: "Clubs", foreignKey: "building_id"});
  ClubRepresentative.belongsTo(ClubRepresentativeType, { as: "type", foreignKey: "type_id"});
  ClubRepresentativeType.hasMany(ClubRepresentative, { as: "ClubRepresentatives", foreignKey: "type_id"});
  Attendance.belongsTo(Division, { as: "fromDivision", foreignKey: "fromDivisionId"});
  Division.hasMany(Attendance, { as: "Attendances", foreignKey: "fromDivisionId"});
  Club.belongsTo(Division, { as: "division", foreignKey: "division_id"});
  Division.hasMany(Club, { as: "Clubs", foreignKey: "division_id"});
  Meeting.belongsTo(Division, { as: "division", foreignKey: "divisionId"});
  Division.hasMany(Meeting, { as: "Meetings", foreignKey: "divisionId"});
  Division.belongsTo(DivisionGroup, { as: "division_group", foreignKey: "division_group_id"});
  DivisionGroup.hasMany(Division, { as: "Divisions", foreignKey: "division_group_id"});
  Meeting.belongsTo(MeetingType, { as: "type", foreignKey: "type_id"});
  MeetingType.hasMany(Meeting, { as: "Meetings", foreignKey: "type_id"});
  ClubRepresentative.belongsTo(Member, { as: "student", foreignKey: "student_id"});
  Member.hasMany(ClubRepresentative, { as: "ClubRepresentatives", foreignKey: "student_id"});
  ExecutiveMember.belongsTo(Member, { as: "student", foreignKey: "student_id"});
  Member.hasOne(ExecutiveMember, { as: "ExecutiveMember", foreignKey: "student_id"});
  Meeting.belongsTo(Member, { as: "editor", foreignKey: "editorId"});
  Member.hasMany(Meeting, { as: "Meetings", foreignKey: "editorId"});
  MemberStatus.belongsTo(Member, { as: "student", foreignKey: "student_id"});
  Member.hasMany(MemberStatus, { as: "MemberStatuses", foreignKey: "student_id"});
  MemberClub.belongsTo(MemberStatus, { as: "student", foreignKey: "student_id"});
  MemberStatus.hasMany(MemberClub, { as: "MemberClubs", foreignKey: "student_id"});
  MemberClub.belongsTo(MemberStatus, { as: "semester", foreignKey: "semester_id"});
  MemberStatus.hasMany(MemberClub, { as: "semester_MemberClubs", foreignKey: "semester_id"});
  MemberStatus.belongsTo(Semester, { as: "semester", foreignKey: "semester_id"});
  Semester.hasMany(MemberStatus, { as: "MemberStatuses", foreignKey: "semester_id"});
  SemesterClub.belongsTo(Semester, { as: "semester", foreignKey: "semester_id"});
  Semester.hasMany(SemesterClub, { as: "SemesterClubs", foreignKey: "semester_id"});
  SemesterClub.belongsTo(SemesterClubType, { as: "type", foreignKey: "type_id"});
  SemesterClubType.hasMany(SemesterClub, { as: "SemesterClubs", foreignKey: "type_id"});

  return {
    Activity,
    ActivityEvidence,
    ActivityMember,
    ActivityType,
    Agenda,
    AgendaType,
    Attendance,
    AttendanceType,
    CafeNotice,
    Club,
    ClubBuilding,
    ClubRepresentative,
    ClubRepresentativeType,
    Division,
    DivisionGroup,
    DivisionPresident,
    ExecutiveMember,
    Fixture,
    Funding,
    Meeting,
    MeetingMemberType,
    MeetingType,
    Member,
    MemberClub,
    MemberStatus,
    PermanentClub,
    Semester,
    SemesterClub,
    SemesterClubType,
    Warning,
    sessions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
