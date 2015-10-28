// Type definitions for bookshelfjs v0.8.2
// Project: http://bookshelfjs.org/
// Definitions by: Andrew Schurman <http://github.com/arcticwaters>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../knex/knex.d.ts" />
/// <reference path="../bluebird/bluebird.d.ts" />

declare module 'bookshelf' {
	import knex = require('knex');
	import Promise = require('bluebird');
	
	interface Bookshelf {
		knex : knex;
		Model : typeof Bookshelf.Model;
		Collection : typeof Bookshelf.Collection;

		transaction<T>(callback : (transaction : Bookshelf.Transaction) => T) : Promise<T>;
	}
	
	function Bookshelf(knex : knex) : Bookshelf;
	
	namespace Bookshelf {
		class Model<T extends Model<any>> implements ModelBase {
			constructor(attributes? : any, options? : ModelOptions);
			
			static collection<T extends Model<any>>(models? : T[], options? : CollectionOptions) : Collection<T>;
			static count(column? : string, options? : CollectionOptions) : Promise<number>;
			// use TypeScript classes
			// static extend<T>(prototypeProperties? : any, classProperties? : any) : Function;
			static fetchAll<T extends Model<any>>() : Promise<Collection<T>>;
			// use new object
			// static forge<T>(attributes? : any, options? : ModelOptions) : T;
			
			belongsTo<R extends Model<any>>(target : {new(...args : any[]) : R}, foreignKey? : string) : R;
			belongsToMany<R extends Model<any>>(target : {new(...args : any[]) : R}, table? : string, foreignKey? : string, otherKey? : string) : Collection<R>;
			clear() : T;
			clone() : T;
			count(column? : string, options? : CollectionOptions) : Promise<number>;
			destroy(options : TransactionOptions) : void;
			escape(attribute : string) : string;
			fetch(options? : FetchOptions) : Promise<T>;
			fetchAll(options? : FetchAllOptions) : Promise<Collection<T>>;
			format(attributes : any) : any;
			get(attribute : string) : any;
			has(attribute : string) : boolean;
			hasChanged(attribute? : string) : boolean;
			hasMany<R extends Model<any>>(target : {new(...args : any[]) : R}, foreignKey? : string) : Collection<R>;
			hasOne<R extends Model<any>>(target : {new(...args : any[]) : R}, foreignKey? : string) : R;
			isNew() : boolean;
			load(relations : string|string[], options? : TransactionOptions) : Promise<T>;
			morphMany<R extends Model<any>>(target : {new(...args : any[]) : R}, name? : string, columnNames? : string[], morphValue? : string) : Collection<R>;
			morphOne<R extends Model<any>>(target : {new(...args : any[]) : R}, name? : string, columnNames? : string[], morphValue? : string) : R;
			morphTo(name : string, columnNames? : string[], ...target : typeof Model[]) : T;
			morphTo(name : string, ...target : typeof Model[]) : T;
			off(event? : string, callback? : Function, context? : any) : void;
			on(event? : string, callback? : Function, context? : any) : void;
			once(event : string, callback : Function, context? : any) : void;
			parse(response : any) : any;
			previous(attribute : string) : any;
			previousAttributes() : any;
			query(...args : any[]) : T | knex.QueryBuilder;
			refresh(options? : FetchOptions) : Promise<T>;
			related<R extends Model<any>>(relation : string) : R | Collection<R>;
			resetQuery() : T;
			save(key? : string, val? : string, options? : SaveOptions) : Promise<T>;
			save(attrs? : any, options? : SaveOptions) : Promise<T>;
			serialize(options? : SerializeOptions) : Object;
			set(attribute : string|any, value? : any, options? : SetOptions) : T;
			through<R extends Model<any>>(interim : typeof Model, throughForeignKey? : string, otherKey? : string) : Collection<R>;
			timestamp(options? : TimestampOptions) : Object;
			toJSON(options? : SerializeOptions) : Object;
			triggerThen(name : string, ...args : any[]) : Promise<any>;
			unset(attribute : string) : T;
			where(properties : Object) : T;
			where(key : string, operatorOrValue : string|number|boolean, valueIfOperator? : string|number|boolean) : T;
		}
		
		interface ModelBase {
			/** Should be declared as a getter instead of a plain property. */
			hasTimestamps? : boolean|string[];
			/** Should be declared as a getter instead of a plain property. */
			idAttribute? : string;
			/** Should be declared as a getter instead of a plain property. Should be required, but cannot have abstract properties yet. */
			tableName? : string;
		}
		
		class Collection<T extends Model<any>> {
			// use TypeScript classes
			// static extend<T>(prototypeProperties? : any, classProperties? : any) : Function;
			// use new object
			// static forge<T>(attributes? : any, options? : ModelOptions) : T;
			
			add(models : any[], options? : CollectionAddOptions) : void;
			at(index : number) : T;
			attach(ids : any[], options? : TransactionOptions) : Promise<Collection<T>>;
			clone() : Collection<T>;
			count(column? : string, options? : CollectionOptions) : Promise<number>;
			create(model : Object, options? : ModelOptions) : Promise<T>;
			detach(ids : any[], options? : TransactionOptions) : Promise<any>;
			fetch(options? : CollectionFetchOptions) : Promise<Collection<T>>;
			fetchOne(options? : CollectionFetchOneOptions) : Promise<T>;
			findWhere(...method : any[]) : T;
			get(id : any) : T;
			invokeThen(name : string, ...args : any[]) : Promise<any>;
			load(relations : string|string[], options? : TransactionOptions) : Promise<Collection<T>>;
			off(event? : string, callback? : Function, context? : any) : void;
			on(event? : string, callback? : Function, context? : any) : void;
			once(event : string, callback : Function, context? : any) : void;
			parse(response : any) : any;
			pluck(attribute : string) : any[];
			pop() : void;
			push(model : any) : Collection<T>;
			query(...args : any[]) : Collection<T> | knex.QueryBuilder;
			reduceThen(iterator : Function, initialValue : any, context : any) : Promise<any>;
			remove(model : T|T[], options? : TransactionOptions) : T|T[];
			reset(model : any[], options? : CollectionAddOptions) : T[];
			resetQuery() : Collection<T>;
			serialize(options? : SerializeOptions) : Object;
			set(models : T[]|any[], options? : CollectionSetOptions) : Collection<T>;
			shift(options? : TransactionOptions) : void;
			slice(begin? : number, end? : number) : void;
			toJSON(options? : SerializeOptions) : Object;
			triggerThen(name : string, ...args : any[]) : Promise<any>;
			unshift(model : any, options? : CollectionAddOptions) : void;
			updatePivot(attributes : any, options? : PivotOptions) : Promise<number>;
			where(...method : any[]) : Collection<T>;
			withPivot(columns : string[]) : Collection<T>;

		}
		
		interface ModelOptions {
			tableName? : string;
			hasTimestamps? : boolean;
			parse? : boolean;
		}
		
		interface TransactionOptions {
			transacting? : Transaction;
		}
		
		interface FetchOptions extends TransactionOptions {
			require? : boolean;
			columns? : string|string[];
			withRelated : string|any|any[];
		}
		
		interface FetchAllOptions extends TransactionOptions {
			require? : boolean;
		}
		
		interface SaveOptions extends TransactionOptions {
			method? : string;
			defaults? : string;
			patch? : boolean;
			require? : boolean;
		}
		
		interface SerializeOptions {
			shallow? : boolean;
			omitPivot? : boolean;
		}
		
		interface SetOptions {
			unset? : boolean;
		}
		
		interface TimestampOptions {
			method? : string;
		}
		
		interface Transaction {}
		
		interface CollectionOptions {
			comparator? : boolean|Function;
		}
		
		interface CollectionAddOptions {
			at? : number;
			merge? : boolean;
		}
		
		interface CollectionFetchOptions {
			require? : boolean;
			withRelated? : string|string[];
		}
		
		interface CollectionFetchOneOptions extends TransactionOptions {
			require? : boolean;
			columns? : string|string[];
		}
		
		interface CollectionSetOptions {
			add? : boolean;
			remove? : boolean;
			merge?: boolean;
		}
		
		interface PivotOptions extends TransactionOptions {
			query? : Function|any;
			require? : boolean;
		}
	}
	
	export = Bookshelf;
}
