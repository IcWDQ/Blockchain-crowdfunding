# -*- coding: utf-8 -*-

import pymongo
from pymongo.errors import ConnectionFailure

from settings import MONGO_URI

ObjectId = pymongo.collection.ObjectId
MONGO_DESCENDING = pymongo.DESCENDING
MONGO_ASCENDING = pymongo.ASCENDING


def catch_mongo_except(func):
    def decorator(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ConnectionFailure:
            return func(*args, **kwargs)
        except Exception as e:
            from traceback import print_exc
            print_exc()

    return decorator


class MongoDB(object):
    """
    Mongodb操作类
    """

    def __init__(self, table, mongo_uri=MONGO_URI):
        self.mongo_client = pymongo.MongoClient(mongo_uri)
        self.db = self.mongo_client['chain']
        self.table = self.db[table]


    def __enter__(self):
        return self

    def __exit__(self, exception_type, exception_value, exception_traceback):
        self.mongo_client.close()
        return False

    @catch_mongo_except
    def getOne(self, **kwargs):
        result = self.table.find_one(kwargs.get("filter"), kwargs.get("fields"), kwargs.get("sort"))
        return result or None

    @catch_mongo_except
    def getAll(self, **kwargs):
        result = self.table.find(kwargs.get("filter"), kwargs.get("fields"))

        sort = kwargs.get("sort")
        if sort is not None:
            result = result.sort(sort)
        limit = kwargs.get("limit")
        if limit is not None:
            result = result.limit(limit)
        skip = kwargs.get("skip")
        if skip is not None:
            result = result.skip(skip)

        return result

    @catch_mongo_except
    def distinct(self, key, filter):
        return self.table.distinct(key,filter)

    @catch_mongo_except
    def count(self, **kwargs):
        return self.table.count(kwargs.get("filter"))

    @catch_mongo_except
    def insertOne(self, value):
        return self.table.insert_one(value)

    @catch_mongo_except
    def updateOne(self, filter, update, upsert=False):
        return self.table.update_one(filter, update, upsert=upsert)

    @catch_mongo_except
    def deleteOne(self, **kwargs):
        return self.table.delete_one(kwargs.get("filter"))

    @catch_mongo_except
    def deleteMany(self, **kwargs):
        return self.table.delete_many(kwargs.get("filter"))

    @catch_mongo_except
    def aggregate(self, **kwargs):
        return self.table.aggregate(kwargs.get("pipeline"))

    @catch_mongo_except
    def changeTable(self, name):
        self.table = self.db[name]

    @catch_mongo_except
    def close(self):
        self.mongo_client.close()


if __name__ == '__main__':
    with MongoDB('chain') as mongo:
        q = mongo.insertOne({'t': 1})
        print(q)
