// For the table on the main page
var options = {
    valueNames: [ 'gene', 'variants', 'de-novo', 'inherited', 'tier', 'id-frequency', 'asd-frequency', 'ep-frequency',
                  'adhd-frequency', 'scz-frequency', 'bd-frequency' ],
    sortClass: "main-data-sort",
    page: 20000
};

var geneList = new List('genes', options);


// For the tables on the individual genes pages
var options2 = {
    valueNames: [ 'patient_id1', 'disorders1', 'variant_type1', 'inheritance1', 'method1',
    'chromosome1', 'cnv_size1', 'genome_build1', 'coding_dna_change1', 'protein_change1',
    'position1', 'reference_sequence1', 'alternate_sequence1', 'date1', 'the_pmid1' ],
    sortClass: "ind-data-sort",
    page: 20000
};

var geneList2 = new List('individual-genes', options2);
