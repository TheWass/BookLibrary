export {};

declare global {
    type RecArray<T> = Array<RecArray<T> | T>;
    interface Group<T> {
        key: Record<keyof T, unknown>;
        items: Array<T>;
    }
    interface Array<T> {
        groupBy(keys: Array<keyof T>): Array<Group<T>>;
    }
}

if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function<T> (this: Array<T>, keys: Array<keyof T>) {
        const sortedGroups: Array<Group<T>> = this.reduce((groups: Array<Group<T>>, item: T) => {
            // Find the group in the reducing list of groups
            const group = groups.find((g: Group<T>) => keys.every(key => item[key] === g.key[key]));

            if (group) {
                // If the group is found, add the item to the group.  (Creating a new instance in the process)
                return groups.map((g: Group<T>) => (g === group ? { ...g, items: [...g.items, item] } : g));
            } else {
                // If the group is not found, create a new group, add the item to the groups.  (Creating a new instance in the process)
                return [...groups,
                    {
                        key: keys.reduce((o, key) => ({ ...o, [key]: item[key] }), {} as Record<keyof T, unknown>),
                        items: [item]
                    }
                ];
            }
        }, [] as Array<Group<T>>);
        return sortedGroups;
    };
}