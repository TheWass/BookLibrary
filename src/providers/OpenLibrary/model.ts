export interface OLBook {
    publishers: Array<string>;  // ["Puffin"]
    number_of_pages: number;    // 96
    isbn_10: Array<string>;     // ["0140328726"]
    covers: Array<number>;      // [8739161]
    last_modified: {
        type: string;           // "/type/datetime"
        value: string;          // "2019-07-10T09:35:22.392927"
    };
    latest_revision: number;    // 12
    key: string;                // "/books/OL7353617M"
    authors: Array<{
        key: string;            // "/authors/OL34184A"
    }>;
    ocaid: string;              // "fantasticmrfoxpu00roal"
    contributions: Array<string>; // ["Tony Ross (Illustrator)"]
    languages: Array<{
        key: string;            // "/languages/eng"
    }>;
    classifications: Record<string, Array<string>>; // {"dewey_decimal_class": ["028/.9"]}
    source_records: Array<string>; // ["ia:fantasticmrfox00dahl_834", "marc:marc_openlibraries_sanfranciscopubliclibrary/sfpl_chq_2018_12_24_run02.mrc:85081404:4525"]
    title: string;              // "Fantastic Mr. Fox",
    identifiers: Record<string, Array<string>>; // {"goodreads": ["1507552"], "librarything": ["6446"]}
    created: {
        type: string;           // "/type/datetime"
        value: string;          // "2008-04-29T13:35:46.876380"
    };
    isbn_13: Array<string>;     // ["9780140328721"]
    local_id: Array<string>;    // ["urn:sfpl:31223064402481", "urn:sfpl:31223117624784", ...]
    publish_date: string;       // "October 1, 1988"
    works: Array<{
        key: string;            // "/works/OL45883W"
    }>;
    type: {
        key: string;            // "/type/edition"
    },
    first_sentence: {
        type: string;           // "/type/text",
        value: string;          // "And these two very old people are the father and mother of Mrs. Bucket."
    },
    revision: number;           // 12
    by_statement: string;
}

// TODO: Fill out this interface.
export interface OLAuthor {
    name: string;
}
