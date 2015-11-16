// Type definitions for bookshelfjs v0.8.2
// Project: http://bookshelfjs.org/
// Definitions by: Andrew Schurman <http://github.com/arcticwaters>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../bluebird/bluebird.d.ts" />
/// <reference path="../lodash/lodash.d.ts" />
/// <reference path="../knex/knex.d.ts" />

declare module 'bookshelf' {
	import knex = require('knex');
	import Promise = require('bluebird');
	import Lodash = require('lodash');
	
	interface Bookshelf {
		knex : knex;
		Model : typeof Bookshelf.Model;
		Collection : typeof Bookshelf.Collection;

		transaction<T>(callback : (transaction : Bookshelf.Transaction) => T) : Promise<T>;
	}
	
	function Bookshelf(knex : knex) : Bookshelf;
	
	namespace Bookshelf {
		class Model<T extends Model<any>> implements ModelBase {
			/** If overriding, must use a getter instead of a plain property. */
			idAttribute : string;
			
			constructor(attributes? : any, options? : ModelOptions);
			
			static collection<T extends Model<any>>(models? : T[], options? : CollectionOptions<T>) : Collection<T>;
			static count(column? : string, options? : SyncOptions) : Promise<number>;
			/** @deprecated use Typescript classes */
			static extend<T extends Model<any>>(prototypeProperties? : any, classProperties? : any) : Function; // should return a type
			static fetchAll<T extends Model<any>>() : Promise<Collection<T>>;
			/** @deprecated should use `new` objects instead. */
			static forge<T>(attributes? : any, options? : ModelOptions) : T;
			
			belongsTo<R extends Model<any>>(target : {new(...args : any[]) : R}, foreignKey? : string) : R;
			belongsToMany<R extends Model<any>>(target : {new(...args : any[]) : R}, table? : string, foreignKey? : string, otherKey? : string) : Collection<R>;
			clear() : T;
			clone() : T;
			count(column? : string, options? : SyncOptions) : Promise<number>;
			destroy(options : SyncOptions) : void;
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
			load(relations : string|string[], options? : LoadOptions) : Promise<T>;
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
			query(...query : string[]) : T;
			query(query : {[key : string] : any}) : T;
			query(callback : (qb : knex.QueryBuilder) => void) : T;
			query() : knex.QueryBuilder;
			refresh(options? : FetchOptions) : Promise<T>;
			related<R extends Model<any>>(relation : string) : R | Collection<R>;
			resetQuery() : T;
			save(key? : string, val? : string, options? : SaveOptions) : Promise<T>;
			save(attrs? : {[key : string] : any}, options? : SaveOptions) : Promise<T>;
			serialize(options? : SerializeOptions) : Object;
			set(attribute : string, value? : any, options? : SetOptions) : T;
			set(attribute?: {[key : string] : any}, options? : SetOptions) : T;
			through<R extends Model<any>>(interim : typeof Model, throughForeignKey? : string, otherKey? : string) : Collection<R>;
			timestamp(options? : TimestampOptions) : Object;
			toJSON(options? : SerializeOptions) : Object;
			triggerThen(name : string, ...args : any[]) : Promise<any>;
			unset(attribute : string) : T;
			where(properties : {[key : string] : any}) : T;
			where(key : string, operatorOrValue : string|number|boolean, valueIfOperator? : string|number|boolean) : T;
			
			// lodash methods
			invert<R extends {}>() : R;
			keys() : string[];
			omit<R extends {}>(predicate? : Lodash.ObjectIterator<any, boolean>, thisArg? : any) : R;
			omit<R extends {}>(...attributes : string[]) : R;
			pairs() : any[][];
			pick<R extends {}>(predicate? : Lodash.ObjectIterator<any, boolean>, thisArg? : any) : R;
			pick<R extends {}>(...attributes : string[]) : R;
			values() : any[];
		}
		
		interface ModelBase {
			/** Should be declared as a getter instead of a plain property. */
			hasTimestamps? : boolean|string[];
			/** Should be declared as a getter instead of a plain property. Should be required, but cannot have abstract properties yet. */
			tableName? : string;
		}
		
		class Collection<T extends Model<any>> {
			/** @deprecated use Typescript classes */
			static extend<T>(prototypeProperties? : any, classProperties? : any) : Function;
			/** @deprecated should use `new` objects instead. */
			static forge<T>(attributes? : any, options? : ModelOptions) : T;
			
			add(models : T[]|{[key : string] : any}[], options? : CollectionAddOptions) : Collection<T>;
			at(index : number) : T;
			attach(ids : any[], options? : SyncOptions) : Promise<Collection<T>>;
			clone() : Collection<T>;
			count(column? : string, options? : SyncOptions) : Promise<number>;
			create(model : Object, options? : ModelOptions) : Promise<T>;
			detach(ids : any[], options? : SyncOptions) : Promise<any>;
			fetch(options? : CollectionFetchOptions) : Promise<Collection<T>>;
			fetchOne(options? : CollectionFetchOneOptions) : Promise<T>;
			findWhere(match : {[key : string] : any}) : T;
			get(id : any) : T;
			invokeThen(name : string, ...args : any[]) : Promise<any>;
			load(relations : string|string[], options? : SyncOptions) : Promise<Collection<T>>;
			off(event? : string, callback? : Function, context? : any) : void;
			on(event? : string, callback? : Function, context? : any) : void;
			once(event : string, callback : Function, context? : any) : void;
			parse(response : any) : any;
			pluck(attribute : string) : any[];
			pop() : void;
			push(model : any) : Collection<T>;
			query(...query : string[]) : Collection<T>;
			query(query : {[key : string] : any}) : Collection<T>;
			query(callback : (qb : knex.QueryBuilder) => void) : Collection<T>;
			query() : knex.QueryBuilder;
			reduceThen<R>(iterator : (prev : R, cur : T, idx : number, array : T[]) => R, initialValue : R, context : any) : Promise<R>;
			remove(model : T, options? : EventOptions) : T;
			remove(model : T[], options? : EventOptions) : T[];
			reset(model : any[], options? : CollectionAddOptions) : T[];
			resetQuery() : Collection<T>;
			serialize(options? : SerializeOptions) : Object;
			set(models : T[]|{[key : string] : any}[], options? : CollectionSetOptions) : Collection<T>;
			shift(options? : EventOptions) : void;
			slice(begin? : number, end? : number) : void;
			toJSON(options? : SerializeOptions) : Object;
			triggerThen(name : string, ...args : any[]) : Promise<any>;
			unshift(model : any, options? : CollectionAddOptions) : void;
			updatePivot(attributes : any, options? : PivotOptions) : Promise<number>;
			where(match : {[key : string] : any}, firstOnly : boolean) : T|Collection<T>;
			withPivot(columns : string[]) : Collection<T>;
			
			// lodash methods
			all(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : boolean;
			all<R extends {}>(predicate? : R) : boolean;
			any(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : boolean;
			any<R extends {}>(predicate? : R) : boolean;
			chain() : Lodash.LoDashExplicitObjectWrapper<T>;
			collect(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : T[];
			collect<R extends {}>(predicate? : R) : T[];
			contains(value : any, fromIndex? : number) : boolean;
			countBy(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : Lodash.Dictionary<number>;
			countBy<R extends {}>(predicate? : R) : Lodash.Dictionary<number>;
			detect(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : T;
			detect<R extends {}>(predicate? : R) : T;
			difference(...values : T[]) : T[];
			drop(n? : number) : T[];
			each(callback? : Lodash.ListIterator<T, void>, thisArg? : any) : Lodash.List<T>;
			each(callback? : Lodash.DictionaryIterator<T, void>, thisArg? : any) : Lodash.Dictionary<T>;
			each(callback? : Lodash.ObjectIterator<T, void>, thisArg? : any) : T;
			every(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : boolean;
			every<R extends {}>(predicate? : R) : boolean;
			filter(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : T[];
			filter<R extends {}>(predicate? : R) : T[];
			find(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : T;
			find<R extends {}>(predicate? : R) : T;
			first() : T;
			foldl<R>(callback? : Lodash.MemoIterator<T, R>, accumulator? : R, thisArg? : any) : R;
			foldr<R>(callback? : Lodash.MemoIterator<T, R>, accumulator? : R, thisArg? : any) : R;
			forEach(callback? : Lodash.ListIterator<T, void>, thisArg? : any) : Lodash.List<T>;
			forEach(callback? : Lodash.DictionaryIterator<T, void>, thisArg? : any) : Lodash.Dictionary<T>;
			forEach(callback? : Lodash.ObjectIterator<T, void>, thisArg? : any) : T;
			groupBy(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : Lodash.Dictionary<T[]>;
			groupBy<R extends {}>(predicate? : R) : Lodash.Dictionary<T[]>;
			head() : T;
			include(value : any, fromIndex? : number) : boolean;
			indexOf(value : any, fromIndex? : number) : number;
			initial() : T[];
			inject<R>(callback? : Lodash.MemoIterator<T, R>, accumulator? : R, thisArg? : any) : R;
			invoke(methodName : string|Function, ...args : any[]) : any;
			isEmpty() : boolean;
			keys() : string[];
			last() : T;
			lastIndexOf(value : any, fromIndex? : number) : number;
			map(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : T[];
			map<R extends {}>(predicate? : R) : T[];
			max(predicate? : Lodash.ListIterator<T, boolean>|string, thisArg? : any) : T;
			max<R extends {}>(predicate? : R) : T;
			min(predicate? : Lodash.ListIterator<T, boolean>|string, thisArg? : any) : T;
			min<R extends {}>(predicate? : R) : T;
			reduce<R>(callback? : Lodash.MemoIterator<T, R>, accumulator? : R, thisArg? : any) : R;
			reduceRight<R>(callback? : Lodash.MemoIterator<T, R>, accumulator? : R, thisArg? : any) : R;
			reject(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : T[];
			reject<R extends {}>(predicate? : R) : T[];
			rest() : T[];
			select(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : T[];
			select<R extends {}>(predicate? : R) : T[];
			shuffle() : T[];
			size() : number;
			some(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : boolean;
			some<R extends {}>(predicate? : R) : boolean;
			sortBy(predicate? : Lodash.ListIterator<T, boolean>|Lodash.DictionaryIterator<T, boolean>|string, thisArg? : any) : T[];
			sortBy<R extends {}>(predicate? : R) : T[];
			tail() : T[];
			take(n? : number) : T[];
			toArray() : T[];
			without(...values : any[]) : T[];
		}
		
		interface ModelOptions {
			tableName? : string;
			hasTimestamps? : boolean;
			parse? : boolean;
		}
		
		interface LoadOptions extends SyncOptions {
			withRelated: string|any|any[];
		}
		
		interface FetchOptions extends SyncOptions {
			require? : boolean;
			columns? : string|string[];
			withRelated : string|any|any[];
		}
		
		interface FetchAllOptions extends SyncOptions {
			require? : boolean;
		}
		
		interface SaveOptions extends SyncOptions {
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
		
		interface SyncOptions {
			transacting? : Transaction;
			debug? : boolean;
		}
		
		interface CollectionOptions<T> {
			comparator? : boolean|string|((a : T, b : T) => number);
		}
		
		interface CollectionAddOptions extends EventOptions {
			at? : number;
			merge? : boolean;
		}
		
		interface CollectionFetchOptions {
			require? : boolean;
			withRelated? : string|string[];
		}
		
		interface CollectionFetchOneOptions {
			require? : boolean;
			columns? : string|string[];
		}
		
		interface CollectionSetOptions extends EventOptions {
			add? : boolean;
			remove? : boolean;
			merge?: boolean;
		}
		
		interface PivotOptions {
			query? : Function|any;
			require? : boolean;
		}
		
		interface EventOptions {
			silent? : boolean;
		}
	}
	
	export = Bookshelf;
}
