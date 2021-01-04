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
        "Stripe": {
            "name": "Stripe",
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
                "stripeCustomerId": {
                    "name": "stripeCustomerId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "stripeSubscriptionId": {
                    "name": "stripeSubscriptionId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Stripes",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUsername",
                        "fields": [
                            "username"
                        ],
                        "queryField": "stripeByUsername"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
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
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "read",
                                    "create"
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
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "alarm2": {
                    "name": "alarm2",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "alarm3": {
                    "name": "alarm3",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
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
                                "provider": "userPools",
                                "ownerField": "username",
                                "allow": "owner",
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ],
                                "identityClaim": "cognito:username"
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
                "username": {
                    "name": "username",
                    "isArray": false,
                    "type": "String",
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
                "transcript": {
                    "name": "transcript",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "score": {
                    "name": "score",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "selfScore": {
                    "name": "selfScore",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "comments": {
                    "name": "comments",
                    "isArray": true,
                    "type": {
                        "model": "Comment"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "reviewId"
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
                                "ownerField": "username",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
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
        "Comment": {
            "name": "Comment",
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
                "reviewId": {
                    "name": "reviewId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "message": {
                    "name": "message",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Comments",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "commentsByReviewId",
                        "fields": [
                            "reviewId"
                        ],
                        "queryField": "commentsByReviewId"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "username",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
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
        }
    },
    "nonModels": {},
    "version": "e038b0fe17cea41b5093d084bafa0494"
};