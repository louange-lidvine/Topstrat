export interface Project {
    name: string;
    price: number;
    maxProjects: number;
    maxDevices: number;
    teamMembers: number;
    features: string[];
    isUnlimitedProjects: boolean;
    isUnlimitedTeamMembers: boolean;
}
