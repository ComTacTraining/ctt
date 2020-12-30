export const schema = {
    "models": {
        "Evolution": {
            "name": "Evolution",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "category": {
                    "name": "category",
                    "isArray": false,
                    "type": {
                        "enum": "Category"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "street": {
                    "name": "street",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "size": {
                    "name": "size",
                    "isArray": false,
                    "type": {
                        "enum": "Size"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "stories": {
                    "name": "stories",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "occupancy": {
                    "name": "occupancy",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "conditions": {
                    "name": "conditions",
                    "isArray": false,
                    "type": {
                        "enum": "Location"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "survivability": {
                    "name": "survivability",
                    "isArray": false,
                    "type": {
                        "enum": "Survivability"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "placement": {
                    "name": "placement",
                    "isArray": false,
                    "type": {
                        "enum": "Location"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "side": {
                    "name": "side",
                    "isArray": false,
                    "type": {
                        "enum": "Location"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "flow": {
                    "name": "flow",
                    "isArray": false,
                    "type": {
                        "enum": "Flow"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "fire": {
                    "name": "fire",
                    "isArray": false,
                    "type": {
                        "enum": "Fire"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "exhaust": {
                    "name": "exhaust",
                    "isArray": false,
                    "type": {
                        "enum": "Location"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "smoke": {
                    "name": "smoke",
                    "isArray": false,
                    "type": {
                        "enum": "Smoke"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "withstanding": {
                    "name": "withstanding",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "attack": {
                    "name": "attack",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "ventilation": {
                    "name": "ventilation",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "exposure": {
                    "name": "exposure",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "ric": {
                    "name": "ric",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "medical": {
                    "name": "medical",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Evolutions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Incident": {
            "name": "Incident",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "icsNims": {
                    "name": "icsNims",
                    "isArray": false,
                    "type": {
                        "enum": "IcsNims"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "command": {
                    "name": "command",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Incidents",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Profile": {
            "name": "Profile",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "username": {
                    "name": "username",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "department": {
                    "name": "department",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "rank": {
                    "name": "rank",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "dispatchCenter": {
                    "name": "dispatchCenter",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "firstOnScene": {
                    "name": "firstOnScene",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "incomingCommandOfficer": {
                    "name": "incomingCommandOfficer",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "alarm1": {
                    "name": "alarm1",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "alarm2": {
                    "name": "alarm2",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "alarm3": {
                    "name": "alarm3",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "showTips": {
                    "name": "showTips",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Profiles",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "Category": {
            "name": "Category",
            "values": [
                "COMMERCIALLEGACY",
                "COMMERCIALMODERN",
                "INDUSTRIALLEGACY",
                "INDUSTRIALMODERN",
                "MULTIFAMILYLEGACY",
                "MULTIFAMILYMODERN",
                "SINGLEFAMILYLEGACY",
                "SINGLEFAMILYMODERN"
            ]
        },
        "Size": {
            "name": "Size",
            "values": [
                "SMALL",
                "MEDIUM",
                "LARGE",
                "EXTRALARGE"
            ]
        },
        "Location": {
            "name": "Location",
            "values": [
                "ALPHA",
                "BRAVO",
                "CHARLIE",
                "DELTA",
                "ROOF",
                "FULLYINVOLVED"
            ]
        },
        "Survivability": {
            "name": "Survivability",
            "values": [
                "POSITIVE",
                "NEGATIVE",
                "MARGINAL"
            ]
        },
        "Flow": {
            "name": "Flow",
            "values": [
                "UNIDIRECTIONAL",
                "BIDIRECTIONAL"
            ]
        },
        "Fire": {
            "name": "Fire",
            "values": [
                "ROOMCONTENTS",
                "STRUCTURE"
            ]
        },
        "Smoke": {
            "name": "Smoke",
            "values": [
                "GRAYLAMINAR",
                "GRAYTURBULENT",
                "BROWNLAMINARR",
                "BROWNTURBULENT",
                "BLACKLAMINAR",
                "BLACKTURBULENT"
            ]
        },
        "IcsNims": {
            "name": "IcsNims",
            "values": [
                "COMMAND",
                "WATER",
                "FIREATTACK",
                "VENTILATION",
                "EXPOSURE",
                "RIC",
                "MEDICAL"
            ]
        },
        "Construction": {
            "name": "Construction",
            "values": [
                "LEGACY",
                "MODERN",
                "BLOCK",
                "METALCLAD",
                "ORDINARY",
                "WOODFRAME",
                "CONCRETETILTUP",
                "CONVENTIONAL",
                "LIGHTWEIGHT"
            ]
        }
    },
    "nonModels": {},
    "version": "45ec6c7b6bef1b0cda07b2292463e7d6"
};