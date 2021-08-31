export const schema = {
    "models": {
        "Option": {
            "name": "Option",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "value": {
                    "name": "value",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Options",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byName",
                        "fields": [
                            "name"
                        ],
                        "queryField": "optionByName"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Review": {
            "name": "Review",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "autoScore": {
                    "name": "autoScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "selfScore": {
                    "name": "selfScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "transcript": {
                    "name": "transcript",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Evolution": {
                    "name": "Evolution",
                    "isArray": false,
                    "type": {
                        "model": "Evolution"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "reviewEvolutionId"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Reviews",
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
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "operations": [
                                    "read",
                                    "create"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
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
                "number": {
                    "name": "number",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
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
                "construction": {
                    "name": "construction",
                    "isArray": true,
                    "type": {
                        "enum": "Construction"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
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
                "entryEgress": {
                    "name": "entryEgress",
                    "isArray": true,
                    "type": {
                        "enum": "Location"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
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
                },
                "salvage": {
                    "name": "salvage",
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
                    "type": "key",
                    "properties": {
                        "name": "byCategory",
                        "fields": [
                            "category"
                        ],
                        "queryField": "evolutionByCategory"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byCategoryNumber",
                        "fields": [
                            "category",
                            "number"
                        ],
                        "queryField": "evolutionByCategoryNumber"
                    }
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
                "BROWNLAMINAR",
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
                "MEDICAL",
                "SALVAGE"
            ]
        }
    },
    "nonModels": {},
    "version": "350f256451f0d3eade3bb3273bfaaa17"
};