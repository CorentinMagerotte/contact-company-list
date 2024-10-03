interface Entity {
    id: string;
    name: string;
    __typename: string;
}

interface Contact extends Entity {
    email: string;
    phone?: string;
}

interface Company extends Entity {
    industry: string;
    contactEmail?: string;
}

type EntityUnion = Contact | Company;
